document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const messagingText = document.getElementById('messaging-text');
    const messagingPreview = document.getElementById('messaging-preview');
    const chatContainer = document.getElementById('chat-container');
    const conversationList = document.getElementById('conversation-list');
    const newConversationButton = document.getElementById('new-conversation-button');
    const newConversationModal = document.getElementById('new-conversation-modal');
    const userSelect = document.getElementById('user-select');
    const startConversationButton = document.getElementById('start-conversation-button');
    const chatHeader = document.getElementById('chat-header');
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatError = document.getElementById('chat-error');
    let currentRecipientId = null;
    let lastMessageId = 0;
    let pollingInterval = null;
  
    // Vérifier si l'utilisateur est connecté
    if (!user) {
      messagingText.style.display = 'block';
      messagingPreview.style.display = 'block';
      chatContainer.style.display = 'none';
      return;
    }
  
    // Afficher la messagerie si l'utilisateur est connecté
    messagingText.style.display = 'none';
    messagingPreview.style.display = 'none';
    chatContainer.style.display = 'flex';
  
    // Charger la liste des conversations
    async function loadConversations() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/chat/conversations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Id': user.id,
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          conversationList.innerHTML = '';
          if (data.conversations.length === 0) {
            conversationList.innerHTML = '<li>Aucune conversation. Commencez-en une !</li>';
            return;
          }
  
          data.conversations.forEach(conv => {
            const li = document.createElement('li');
            li.className = 'conversation-item';
            li.setAttribute('data-user-id', conv.id);
            li.textContent = conv.name;
            li.addEventListener('click', () => startConversation(conv.id, conv.name));
            conversationList.appendChild(li);
          });
        } else {
          chatError.textContent = data.message;
          chatError.style.display = 'block';
        }
      } catch (error) {
        console.error('Erreur lors du chargement des conversations :', error);
        chatError.textContent = 'Erreur serveur. Veuillez réessayer plus tard.';
        chatError.style.display = 'block';
      }
    }
  
    // Charger tous les utilisateurs pour la modale
    async function loadUsers() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          userSelect.innerHTML = '<option value="">Sélectionnez un utilisateur</option>';
          data.users.forEach(u => {
            if (u.id !== user.id) {
              const option = document.createElement('option');
              option.value = u.id;
              option.textContent = u.name;
              userSelect.appendChild(option);
            }
          });
        } else {
          chatError.textContent = data.message;
          chatError.style.display = 'block';
        }
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs :', error);
        chatError.textContent = 'Erreur serveur. Veuillez réessayer plus tard.';
        chatError.style.display = 'block';
      }
    }
  
    // Charger les messages d'une conversation
    async function loadMessages() {
      if (!currentRecipientId) return;
  
      try {
        const response = await fetch(`http://localhost:5000/api/auth/chat/messages/${currentRecipientId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Id': user.id,
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const messages = data.messages;
          if (messages.length === 0) {
            chatMessages.innerHTML = '<p>Aucun message pour le moment. Soyez le premier à écrire !</p>';
            return;
          }
  
          const newMessages = messages.filter(message => message.id > lastMessageId);
          newMessages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = `chat-bubble ${message.sender_id === user.id ? 'sent' : 'received'}`;
            messageElement.innerHTML = `
              <div class="chat-meta">Par ${message.sender_name} • ${new Date(message.created_at).toLocaleString('fr-FR')}</div>
              <p>${message.content}</p>
            `;
            chatMessages.appendChild(messageElement);
            lastMessageId = Math.max(lastMessageId, message.id);
          });
  
          chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
          chatError.textContent = data.message;
          chatError.style.display = 'block';
        }
      } catch (error) {
        console.error('Erreur lors du chargement des messages :', error);
        chatError.textContent = 'Erreur serveur. Veuillez réessayer plus tard.';
        chatError.style.display = 'block';
      }
    }
  
    // Démarrer une conversation
    function startConversation(recipientId, recipientName) {
      currentRecipientId = recipientId;
      lastMessageId = 0;
      chatMessages.innerHTML = '';
      chatHeader.innerHTML = `<h3>Discussion avec ${recipientName}</h3>`;
      chatForm.style.display = 'flex';
  
      // Arrêter le polling précédent
      if (pollingInterval) clearInterval(pollingInterval);
  
      // Charger les messages immédiatement
      loadMessages();
  
      // Démarrer le polling pour les nouveaux messages
      pollingInterval = setInterval(loadMessages, 5000);
  
      // Recharger la liste des conversations pour inclure la nouvelle
      loadConversations();
    }
  
    // Charger les conversations au démarrage
    loadConversations();
  
    // Gérer l'ouverture de la modale pour une nouvelle conversation
    newConversationButton.addEventListener('click', () => {
      newConversationModal.style.display = 'block';
      loadUsers();
    });
  
    // Fermer la modale
    newConversationModal.querySelector('.close-modal').addEventListener('click', () => {
      newConversationModal.style.display = 'none';
    });
  
    // Démarrer une nouvelle conversation
    startConversationButton.addEventListener('click', () => {
      const recipientId = userSelect.value;
      if (!recipientId) {
        alert('Veuillez sélectionner un utilisateur.');
        return;
      }
  
      const recipientName = userSelect.options[userSelect.selectedIndex].text;
      startConversation(recipientId, recipientName);
      newConversationModal.style.display = 'gray';

      newConversationModal.style.display = 'none';
    });
  
    // Gérer l'envoi d'un nouveau message
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      chatError.style.display = 'none';
      chatError.textContent = '';
  
      const content = chatInput.value.trim();
      if (!content) {
        chatError.textContent = 'Veuillez entrer un message.';
        chatError.style.display = 'block';
        return;
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/auth/chat/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ senderId: user.id, recipientId: currentRecipientId, content }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          chatInput.value = '';
          loadMessages();
        } else {
          chatError.textContent = data.message;
          chatError.style.display = 'block';
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message :', error);
        chatError.textContent = 'Erreur serveur. Veuillez réessayer plus tard.';
        chatError.style.display = 'block';
      }
    });
});