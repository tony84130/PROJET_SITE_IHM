document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const topicsList = document.getElementById('topics-list');
    const pagination = document.getElementById('pagination');
    const createTopicButton = document.getElementById('create-topic-button');
    const createTopicForm = document.getElementById('create-topic-form');
    const errorMessage = document.getElementById('error-message');
    let currentPage = 1;
    const topicsPerPage = 5;
  
    // Masquer les éléments pour les utilisateurs non connectés
    if (!user) {
      createTopicButton.style.display = 'none';
      createTopicForm.style.display = 'none';
    } else {
      createTopicButton.style.display = 'block';
      createTopicForm.style.display = 'block';
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
  
    // Charger les sujets avec pagination
    async function loadTopics(page = 1) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/forum/topics?page=${page}&limit=${topicsPerPage}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        const data = await response.json();
  
        if (response.ok) {
          const topics = data.topics || [];
          const totalTopics = data.total || 0;
  
          // Vider la liste des sujets
          topicsList.innerHTML = '';
  
          if (topics.length === 0) {
            topicsList.innerHTML = '<p>Aucun sujet pour le moment. Créez le premier sujet !</p>';
            pagination.innerHTML = '';
            return;
          }
  
          // Afficher les sujets
          topics.forEach((topic) => {
            const topicCard = document.createElement('a');
            topicCard.className = 'topic-card';
            topicCard.href = `/pied_page/topic.html?id=${topic.id}`;
            topicCard.setAttribute('data-user-id', topic.user_id);
  
            // Formater la date de création
            const createdAt = new Date(topic.created_at).toLocaleString('fr-FR');
  
            topicCard.innerHTML = `
              <h3>${topic.title}</h3>
              <p>${topic.description}</p>
              <div class="topic-meta">Par ${topic.author} • Créé le ${createdAt}</div>
              <div class="topic-actions" style="display: ${
                user && user.id === topic.user_id ? 'block' : 'none'
              };">
                <button class="edit-topic-button" data-topic-id="${topic.id}">Modifier</button>
                <button class="delete-topic-button" data-topic-id="${topic.id}">Supprimer</button>
              </div>
            `;
            topicsList.appendChild(topicCard);
          });
  
          // Gestion des boutons d'édition et de suppression
          document.querySelectorAll('.edit-topic-button').forEach((button) => {
            button.addEventListener('click', async (e) => {
              e.preventDefault();
              const topicId = button.getAttribute('data-topic-id');
              //const topic = topics.find((t) => t.id === topicId);
              let topic = "";
              //console.log(topics);
              topics.forEach((t) => {
                if (t.id == topicId) {
                  topic = t;
                }
              });
              //console.log(topicId);
  
              const modal = document.createElement('div');
              modal.className = 'modal';
              modal.innerHTML = `
                <div class="modal-content">
                  <span class="close-modal">×</span>
                  <h3>Modifier le sujet</h3>
                  <form id="edit-topic-form">
                    <label for="topic-title">Titre :</label>
                    <input type="text" id="topic-title" name="title" value="${topic.title}" required>
                    <label for="topic-description">Description :</label>
                    <textarea id="topic-description" name="description" required>${
                      topic.description
                    }</textarea>
                    <button type="submit">Enregistrer</button>
                  </form>
                </div>
              `;
              document.body.appendChild(modal);
  
              modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
              });
  
              modal.querySelector('#edit-topic-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                const newTitle = modal.querySelector('#topic-title').value.trim();
                const newDescription = modal.querySelector('#topic-description').value.trim();
  
                if (!newTitle || !newDescription) {
                  displayError(errorMessage, 'Le titre et la description sont requis.');
                  return;
                }
  
                try {
                  const response = await fetch(
                    `http://localhost:5000/api/auth/forum/topics/${topicId}`,
                    {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        'User-Id': user.id,
                      },
                      body: JSON.stringify({ title: newTitle, description: newDescription }),
                    }
                  );
  
                  const data = await response.json();
  
                  if (response.ok) {
                    loadTopics(currentPage);
                    modal.remove();
                  } else {
                    displayError(errorMessage, data.message || 'Erreur lors de la modification.');
                  }
                } catch (error) {
                  console.error('Erreur lors de la modification du sujet :', error);
                  displayError(errorMessage, 'Erreur serveur. Veuillez réessayer plus tard.');
                }
              });
            });
          });
  
          document.querySelectorAll('.delete-topic-button').forEach((button) => {
            button.addEventListener('click', async (e) => {
              e.preventDefault();
              const topicId = button.getAttribute('data-topic-id');
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
                  loadTopics(currentPage);
                } else {
                  displayError(errorMessage, data.message || 'Erreur lors de la suppression.');
                }
              } catch (error) {
                console.error('Erreur lors de la suppression du sujet :', error);
                displayError(errorMessage, 'Erreur serveur. Veuillez réessayer plus tard.');
              }
            });
          });
  
          // Mettre à jour la pagination
          const totalPages = Math.ceil(totalTopics / topicsPerPage);
          pagination.innerHTML = `
            <button id="prev-page" ${page === 1 ? 'disabled' : ''}>Précédent</button>
            <span>Page ${page} sur ${totalPages}</span>
            <button id="next-page" ${page === totalPages ? 'disabled' : ''}>Suivant</button>
          `;
  
          // Gestion des boutons de pagination
          const prevPage = document.getElementById('prev-page');
          const nextPage = document.getElementById('next-page');
  
          prevPage?.addEventListener('click', () => {
            if (currentPage > 1) {
              currentPage--;
              loadTopics(currentPage);
            }
          });
  
          nextPage?.addEventListener('click', () => {
            if (currentPage < totalPages) {
              currentPage++;
              loadTopics(currentPage);
            }
          });
        } else {
          topicsList.innerHTML = '<p>Erreur lors du chargement des sujets.</p>';
          displayError(errorMessage, data.message || 'Erreur lors du chargement.');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des sujets :', error);
        topicsList.innerHTML = '<p>Erreur serveur. Veuillez réessayer plus tard.</p>';
        displayError(errorMessage, 'Erreur serveur. Veuillez réessayer plus tard.');
      }
    }
  
    // Charger les sujets au démarrage
    loadTopics();
  
    // Gérer l'affichage du formulaire de création
    createTopicButton.addEventListener('click', (e) => {
      e.preventDefault();
      createTopicForm.style.display = createTopicForm.style.display === 'none' ? 'block' : 'none';
    });
  
    // Gérer la soumission du formulaire de création de sujet
    createTopicForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      if (!user) {
        displayError(errorMessage, 'Veuillez vous connecter pour créer un sujet.');
        setTimeout(() => {
          window.location.href = '/entete_page/connexion.html';
        }, 2000);
        return;
      }
  
      const title = document.getElementById('topic-title').value.trim();
      const description = document.getElementById('topic-description').value.trim();
  
      if (!title || !description) {
        displayError(errorMessage, 'Veuillez remplir tous les champs.');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/auth/forum/topics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Id': user.id, // Note : Préférer un JWT ou une authentification serveur
          },
          body: JSON.stringify({ userId: user.id, title, description }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          document.getElementById('topic-title').value = '';
          document.getElementById('topic-description').value = '';
          createTopicForm.style.display = 'none';
          loadTopics();
        } else {
          displayError(errorMessage, data.message || 'Erreur lors de la création du sujet.');
        }
      } catch (error) {
        console.error('Erreur lors de la création du sujet :', error);
        displayError(errorMessage, 'Erreur serveur. Veuillez réessayer plus tard.');
      }
    });
  });