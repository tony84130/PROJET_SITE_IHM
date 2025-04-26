const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const router = express.Router();

// Route pour l'inscription
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
  }

  try {
    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.promise().query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: 'Inscription réussie !' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour la connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
  }

  try {
    const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    res.status(200).json({ message: 'Connexion réussie !', user: { id: user[0].id, name: user[0].name, email: user[0].email } });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour mettre à jour l'abonnement
router.post('/update-subscription', async (req, res) => {
  const { userId, subscriptionType } = req.body;

  if (!userId || !subscriptionType) {
    return res.status(400).json({ message: 'Utilisateur et type d\'abonnement requis.' });
  }

  const validSubscriptions = ['free', 'premium', 'enterprise'];
  if (!validSubscriptions.includes(subscriptionType)) {
    return res.status(400).json({ message: 'Type d\'abonnement invalide.' });
  }

  try {
    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    await db.promise().query('UPDATE users SET subscription_type = ? WHERE id = ?', [subscriptionType, userId]);

    res.status(200).json({ message: 'Abonnement mis à jour avec succès !' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'abonnement :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour récupérer les informations d'un utilisateur
router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const [user] = await db.promise().query('SELECT id, name, email, subscription_type FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ user: user[0] });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour récupérer tous les sujets avec pagination
router.get('/forum/topics', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const [totalResult] = await db.promise().query('SELECT COUNT(*) AS total FROM topics');
    const total = totalResult[0].total;

    const [topics] = await db.promise().query(`
      SELECT 
        t.id, 
        t.title, 
        t.description, 
        t.created_at, 
        t.user_id,  -- Ajout de user_id pour la comparaison
        u.name AS author, 
        COUNT(m.id) AS message_count,
        MAX(m.created_at) AS last_message_at
      FROM topics t
      LEFT JOIN messages m ON t.id = m.topic_id
      JOIN users u ON t.user_id = u.id
      GROUP BY t.id
      ORDER BY t.created_at DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    const now = new Date();
    const topicsWithMeta = topics.map(topic => {
      const lastMessageDate = topic.last_message_at ? new Date(topic.last_message_at) : new Date(topic.created_at);
      const timeDiff = now - lastMessageDate;
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      let timeAgo;
      if (daysDiff > 0) {
        timeAgo = daysDiff === 1 ? 'hier' : `il y a ${daysDiff} jours`;
      } else if (hoursDiff > 0) {
        timeAgo = `il y a ${hoursDiff}h`;
      } else {
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        timeAgo = minutesDiff <= 1 ? 'à l\'instant' : `il y a ${minutesDiff} min`;
      }

      return {
        ...topic,
        meta: `${topic.message_count} réponse${topic.message_count !== 1 ? 's' : ''} • Dernier message : ${timeAgo}`,
      };
    });

    res.status(200).json({ topics: topicsWithMeta, total });
  } catch (error) {
    console.error('Erreur lors de la récupération des sujets :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour créer un nouveau sujet
router.post('/forum/topics', async (req, res) => {
  const { userId, title, description } = req.body;

  if (!userId || !title || !description) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const [result] = await db.promise().query(
      'INSERT INTO topics (title, description, user_id) VALUES (?, ?, ?)',
      [title, description, userId]
    );

    res.status(201).json({ message: 'Sujet créé avec succès !', topicId: result.insertId });
  } catch (error) {
    console.error('Erreur lors de la création du sujet :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour ajouter un message à un sujet
router.post('/forum/messages', async (req, res) => {
  const { topicId, userId, content } = req.body;

  if (!topicId || !userId || !content) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const [topic] = await db.promise().query('SELECT * FROM topics WHERE id = ?', [topicId]);
    if (topic.length === 0) {
      return res.status(404).json({ message: 'Sujet non trouvé.' });
    }

    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    await db.promise().query(
      'INSERT INTO messages (topic_id, user_id, content) VALUES (?, ?, ?)',
      [topicId, userId, content]
    );

    res.status(201).json({ message: 'Message ajouté avec succès !' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du message :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour récupérer les détails d'un sujet et ses messages
router.get('/forum/topics/:id', async (req, res) => {
  const topicId = req.params.id;

  try {
    const [topics] = await db.promise().query(`
      SELECT t.id, t.title, t.description, t.created_at, t.user_id, u.name AS author
      FROM topics t
      JOIN users u ON t.user_id = u.id
      WHERE t.id = ?
    `, [topicId]);

    if (topics.length === 0) {
      return res.status(404).json({ message: 'Sujet non trouvé.' });
    }

    const [messages] = await db.promise().query(`
      SELECT m.id, m.content, m.created_at, m.user_id, u.name AS author
      FROM messages m
      JOIN users u ON m.user_id = u.id
      WHERE m.topic_id = ?
      ORDER BY m.created_at ASC
    `, [topicId]);

    res.status(200).json({ topic: topics[0], messages });
  } catch (error) {
    console.error('Erreur lors de la récupération du sujet :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Middleware pour vérifier l'utilisateur
const verifyUser = (req, res, next) => {
  const userId = req.headers['user-id'];
  if (!userId) {
    return res.status(401).json({ message: 'Utilisateur non authentifié.' });
  }
  req.userId = parseInt(userId);
  next();
};

// Route pour modifier un message
router.put('/forum/messages/:id', verifyUser, async (req, res) => {
  const messageId = parseInt(req.params.id);
  const { content } = req.body;
  const userId = req.userId;

  if (!content) {
    return res.status(400).json({ message: 'Le contenu est requis.' });
  }

  try {
    const [message] = await db.promise().query('SELECT * FROM messages WHERE id = ?', [messageId]);
    if (message.length === 0) {
      return res.status(404).json({ message: 'Message non trouvé.' });
    }

    if (message[0].user_id !== userId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce message.' });
    }

    await db.promise().query('UPDATE messages SET content = ? WHERE id = ?', [content, messageId]);

    res.status(200).json({ message: 'Message modifié avec succès !' });
  } catch (error) {
    console.error('Erreur lors de la modification du message :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour supprimer un message
router.delete('/forum/messages/:id', verifyUser, async (req, res) => {
  const messageId = parseInt(req.params.id);
  const userId = req.userId;

  try {
    const [message] = await db.promise().query('SELECT * FROM messages WHERE id = ?', [messageId]);
    if (message.length === 0) {
      return res.status(404).json({ message: 'Message non trouvé.' });
    }

    if (message[0].user_id !== userId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce message.' });
    }

    await db.promise().query('DELETE FROM messages WHERE id = ?', [messageId]);

    res.status(200).json({ message: 'Message supprimé avec succès !' });
  } catch (error) {
    console.error('Erreur lors de la suppression du message :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour modifier un topic
router.put('/forum/topics/:id', verifyUser, async (req, res) => {
  const topicId = parseInt(req.params.id);
  const { title, description } = req.body;
  const userId = req.userId;

  if (!title || !description) {
    return res.status(400).json({ message: 'Le titre et la description sont requis.' });
  }

  try {
    const [topic] = await db.promise().query('SELECT * FROM topics WHERE id = ?', [topicId]);
    if (topic.length === 0) {
      return res.status(404).json({ message: 'Sujet non trouvé.' });
    }

    if (topic[0].user_id !== userId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce sujet.' });
    }

    await db.promise().query('UPDATE topics SET title = ?, description = ? WHERE id = ?', [title, description, topicId]);

    res.status(200).json({ message: 'Sujet modifié avec succès !' });
  } catch (error) {
    console.error('Erreur lors de la modification du sujet :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour supprimer un topic
router.delete('/forum/topics/:id', verifyUser, async (req, res) => {
  const topicId = parseInt(req.params.id);
  const userId = req.userId;

  try {
    const [topic] = await db.promise().query('SELECT * FROM topics WHERE id = ?', [topicId]);
    if (topic.length === 0) {
      return res.status(404).json({ message: 'Sujet non trouvé.' });
    }

    if (topic[0].user_id !== userId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce sujet.' });
    }

    await db.promise().query('DELETE FROM topics WHERE id = ?', [topicId]);

    res.status(200).json({ message: 'Sujet supprimé avec succès !' });
  } catch (error) {
    console.error('Erreur lors de la suppression du sujet :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour récupérer la liste des utilisateurs avec qui l'utilisateur a une conversation
router.get('/chat/conversations', async (req, res) => {
    const userId = req.headers['user-id'];
  
    if (!userId) {
      return res.status(401).json({ message: 'Utilisateur non authentifié.' });
    }
  
    try {
      // Récupérer les utilisateurs avec qui l'utilisateur a échangé des messages
      const [conversations] = await db.promise().query(`
        SELECT DISTINCT u.id, u.name
        FROM users u
        WHERE u.id IN (
          SELECT sender_id FROM chat_messages WHERE recipient_id = ?
          UNION
          SELECT recipient_id FROM chat_messages WHERE sender_id = ?
        )
        AND u.id != ?
      `, [userId, userId, userId]);
  
      res.status(200).json({ conversations });
    } catch (error) {
      console.error('Erreur lors de la récupération des conversations :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
});
  
// Route pour récupérer les messages d'une conversation entre deux utilisateurs
router.get('/chat/messages/:recipientId', async (req, res) => {
    const userId = req.headers['user-id'];
    const recipientId = req.params.recipientId;
  
    if (!userId) {
      return res.status(401).json({ message: 'Utilisateur non authentifié.' });
    }
  
    try {
      const [messages] = await db.promise().query(`
        SELECT m.id, m.content, m.created_at, m.sender_id, m.recipient_id, u.name AS sender_name
        FROM chat_messages m
        JOIN users u ON m.sender_id = u.id
        WHERE (m.sender_id = ? AND m.recipient_id = ?)
        OR (m.sender_id = ? AND m.recipient_id = ?)
        ORDER BY m.created_at ASC
      `, [userId, recipientId, recipientId, userId]);
  
      res.status(200).json({ messages });
    } catch (error) {
      console.error('Erreur lors de la récupération des messages :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
});
  
// Route pour envoyer un message privé
router.post('/chat/messages', async (req, res) => {
    const { senderId, recipientId, content } = req.body;
  
    if (!senderId || !recipientId || !content) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }
  
    try {
      const [sender] = await db.promise().query('SELECT * FROM users WHERE id = ?', [senderId]);
      const [recipient] = await db.promise().query('SELECT * FROM users WHERE id = ?', [recipientId]);
  
      if (sender.length === 0 || recipient.length === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      await db.promise().query(
        'INSERT INTO chat_messages (sender_id, recipient_id, content) VALUES (?, ?, ?)',
        [senderId, recipientId, content]
      );
  
      res.status(201).json({ message: 'Message envoyé avec succès !' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// Route pour récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
      const [users] = await db.promise().query('SELECT id, name FROM users');
      res.status(200).json({ users });
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
});

//console.log('Routes enregistrées :', router.stack.map(r => r.route?.path));
module.exports = router;