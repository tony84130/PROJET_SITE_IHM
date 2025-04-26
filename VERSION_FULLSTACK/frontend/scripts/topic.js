document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const topicId = new URLSearchParams(window.location.search).get('id');
    const topicTitle = document.getElementById('topic-title');
    const topicDescription = document.getElementById('topic-description');
    const topicMeta = document.getElementById('topic-meta');
    const messagesList = document.getElementById('messages-list');
    const replyFormContainer = document.getElementById('reply-form-container');
    const replyError = document.getElementById('reply-error');
  
    // Masquer le formulaire de réponse si non connecté
    if (!user) {
      replyFormContainer.style.display = 'none';
    }
  
    // Fonction utilitaire pour afficher les erreurs
    const displayError = (element, message) => {
      element.textContent = message;
      element.style.display = 'block';
      setTimeout(() => {
        element.style.display = 'none';
        element.textContent = '';
      }, 5000);
    };
  
    // Charger les détails du sujet
    async function loadTopicDetails() {
      if (!topicId) {
        topicTitle.textContent = 'Erreur';
        topicDescription.textContent = 'Aucun sujet spécifié.';
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/auth/forum/topics/${topicId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const topic = data.topic || {};
          const messages = data.messages || [];
  
          // Afficher les détails du sujet
          topicTitle.textContent = topic.title || 'Sujet sans titre';
          topicDescription.textContent = topic.description || 'Aucune description';
          topicMeta.textContent = `Par ${topic.author || 'Anonyme'} • Créé le ${
            topic.created_at
              ? new Date(topic.created_at).toLocaleDateString('fr-FR')
              : 'Date inconnue'
          }`;
          topicMeta.setAttribute('data-user-id', topic.user_id || '');
  
          // Afficher les messages
          messagesList.innerHTML = '';
          if (messages.length === 0) {
            messagesList.innerHTML = '<p>Aucun message pour le moment. Soyez le premier à répondre !</p>';
          } else {
            messages.forEach((message) => {
              const messageCard = document.createElement('div');
              messageCard.className = 'message-card';
              messageCard.setAttribute('data-message-id', message.id);
              messageCard.setAttribute('data-user-id', message.user_id);
  
              messageCard.innerHTML = `
                <div class="message-meta">Par ${
                  message.author || 'Anonyme'
                } • ${new Date(message.created_at).toLocaleString('fr-FR')}</div>
                <p class="message-content">${message.content}</p>
                <div class="message-actions" style="display: ${
                  user && user.id === message.user_id ? 'block' : 'none'
                };">
                  <button class="edit-message-button">Modifier</button>
                  <button class="delete-message-button">Supprimer</button>
                </div>
              `;
              messagesList.appendChild(messageCard);
  
              if (user && user.id === message.user_id) {
                // Bouton Modifier
                messageCard.querySelector('.edit-message-button').addEventListener('click', () => {
                  const contentElement = messageCard.querySelector('.message-content');
                  const originalContent = contentElement.textContent;
  
                  const modal = document.createElement('div');
                  modal.className = 'modal';
                  modal.innerHTML = `
                    <div class="modal-content">
                      <span class="close-modal">×</span>
                      <h3>Modifier votre message</h3>
                      <form id="edit-message-form">
                        <label for="message-content">Message :</label>
                        <textarea id="message-content" name="content" required>${originalContent}</textarea>
                        <button type="submit">Enregistrer</button>
                      </form>
                    </div>
                  `;
                  document.body.appendChild(modal);
  
                  modal.querySelector('.close-modal').addEventListener('click', () => {
                    modal.remove();
                  });
  
                  modal.querySelector('#edit-message-form').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const newContent = modal.querySelector('#message-content').value.trim();
  
                    if (!newContent) {
                      displayError(replyError, 'Le message ne peut pas être vide.');
                      return;
                    }
  
                    try {
                      const response = await fetch(
                        `http://localhost:5000/api/auth/forum/messages/${message.id}`,
                        {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            'User-Id': user.id,
                          },
                          body: JSON.stringify({ content: newContent }),
                        }
                      );
  
                      const data = await response.json();
  
                      if (response.ok) {
                        contentElement.textContent = newContent;
                        modal.remove();
                      } else {
                        displayError(replyError, data.message || 'Erreur lors de la modification.');
                      }
                    } catch (error) {
                      console.error('Erreur lors de la modification du message :', error);
                      displayError(replyError, 'Erreur serveur. Veuillez réessayer plus tard.');
                    }
                  });
                });
  
                // Bouton Supprimer
                messageCard
                  .querySelector('.delete-message-button')
                  .addEventListener('click', async () => {
                    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;
  
                    try {
                      const response = await fetch(
                        `http://localhost:5000/api/auth/forum/messages/${message.id}`,
                        {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json',
                            'User-Id': user.id,
                          },
                        }
                      );
  
                      const data = await response.json();
  
                      if (response.ok) {
                        messageCard.remove();
                        if (!messagesList.children.length) {
                          messagesList.innerHTML =
                            '<p>Aucun message pour le moment. Soyez le premier à répondre !</p>';
                        }
                      } else {
                        displayError(replyError, data.message || 'Erreur lors de la suppression.');
                      }
                    } catch (error) {
                      console.error('Erreur lors de la suppression du message :', error);
                      displayError(replyError, 'Erreur serveur. Veuillez réessayer plus tard.');
                    }
                  });
              }
            });
          }
  
          // Ajouter un bouton pour supprimer le topic si l'utilisateur est l'auteur
          if (user && user.id === topic.user_id) {
            const existingButton = document.querySelector('.delete-topic-button');
            if (!existingButton) {
              const deleteTopicButton = document.createElement('button');
              deleteTopicButton.className = 'delete-topic-button';
              deleteTopicButton.textContent = 'Supprimer le sujet';
              topicMeta.insertAdjacentElement('afterend', deleteTopicButton);
  
              deleteTopicButton.addEventListener('click', async () => {
                if (!confirm('Êtes-vous sûr de vouloir supprimer ce sujet et tous ses messages ?'))
                  return;
  
                try {
                  const response = await fetch(
                    `http://localhost:5000/api/auth/forum/topics/${topicId}`,
                    {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                        'User-Id': user.id,
                      },
                    }
                  );
  
                  const data = await response.json();
  
                  if (response.ok) {
                    window.location.href = '/pied_page/forum.html';
                  } else {
                    displayError(replyError, data.message || 'Erreur lors de la suppression.');
                  }
                } catch (error) {
                  console.error('Erreur lors de la suppression du sujet :', error);
                  displayError(replyError, 'Erreur serveur. Veuillez réessayer plus tard.');
                }
              });
            }
          }
        } else {
          topicTitle.textContent = 'Erreur';
          topicDescription.textContent = data.message || 'Erreur lors du chargement du sujet.';
        }
      } catch (error) {
        console.error('Erreur lors du chargement du sujet :', error);
        topicTitle.textContent = 'Erreur';
        topicDescription.textContent = 'Erreur serveur. Veuillez réessayer plus tard.';
      }
    }
  
    // Charger les détails au démarrage
    loadTopicDetails();
  
    // Gérer la soumission du formulaire de réponse
    const replyForm = document.getElementById('reply-form');
    replyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      if (!user) {
        displayError(replyError, 'Veuillez vous connecter pour répondre.');
        setTimeout(() => {
          window.location.href = '/entete_page/connexion.html';
        }, 2000);
        return;
      }
  
      const content = document.getElementById('reply-content').value.trim();
  
      if (!content) {
        displayError(replyError, 'Veuillez entrer une réponse.');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/auth/forum/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Id': user.id,
          },
          body: JSON.stringify({ topicId, userId: user.id, content }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          document.getElementById('reply-content').value = '';
          loadTopicDetails();
        } else {
          displayError(replyError, data.message || 'Erreur lors de l’envoi du message.');
        }
      } catch (error) {
        console.error('Erreur lors de l’envoi du message :', error);
        displayError(replyError, 'Erreur serveur. Veuillez réessayer plus tard.');
      }
    });
  });