document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si l'utilisateur est connecté
    const user = JSON.parse(localStorage.getItem('user'));
  
    // Afficher l'abonnement actuel si l'utilisateur est connecté
    const subscriptionMessage = document.createElement('p');
    subscriptionMessage.className = 'subscription-status';
    let currentSubscription = 'free'; // Par défaut
  
    if (user) {
      fetch(`http://localhost:5000/api/auth/user/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.user) {
            currentSubscription = data.user.subscription_type;
            subscriptionMessage.textContent = `Votre abonnement actuel : ${currentSubscription}`;
            updateButtonText(currentSubscription); // Mettre à jour les boutons dès le chargement
          } else {
            subscriptionMessage.textContent = 'Erreur lors de la récupération de l\'abonnement.';
          }
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de l\'abonnement :', error);
          subscriptionMessage.textContent = 'Erreur lors de la récupération de l\'abonnement.';
        });
    } else {
      subscriptionMessage.textContent = 'Veuillez vous connecter pour voir votre abonnement.';
    }
    document.querySelector('.pricing-main').insertBefore(subscriptionMessage, document.querySelector('.pricing-container'));
  
    // Fonction pour mettre à jour le texte des boutons
    function updateButtonText(subscriptionType) {
      document.querySelectorAll('.pricing-button').forEach(button => {
        const plan = button.parentElement.querySelector('h3').textContent.toLowerCase();
        const normalizedPlan = plan === 'gratuit' ? 'free' : plan;
        if (normalizedPlan === subscriptionType && button.textContent !== 'Contacter') {
          button.textContent = 'Abonnement actif';
          button.disabled = true; // Désactiver le bouton pour l'abonnement actif
        } else if (button.textContent !== 'Contacter') {
          button.textContent = button.textContent === 'Abonnement actif' ? (plan === 'gratuit' ? 'S\'inscrire' : 'S\'abonner') : button.textContent;
          button.disabled = false;
        }
      });
    }
  
    // Gérer les clics sur les boutons d'abonnement
    document.querySelectorAll('.pricing-button').forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
  
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        if (!user) {
          window.location.href = '/entete_page/connexion.html';
          return;
        }
  
        // Gérer le bouton "Contacter" (redirection directe)
        if (button.textContent === 'Contacter') {
          window.location.href = '/pied_page/contact.html';
          return;
        }
  
        // Déterminer le type d'abonnement en fonction du bouton cliqué
        const plan = button.parentElement.querySelector('h3').textContent.toLowerCase();
        const subscriptionType = plan === 'gratuit' ? 'free' : plan;
  
        try {
          const response = await fetch('http://localhost:5000/api/auth/update-subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id, subscriptionType }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert(data.message);
            // Mettre à jour la variable et l'affichage directement
            currentSubscription = subscriptionType;
            subscriptionMessage.textContent = `Votre abonnement actuel : ${currentSubscription}`;
            updateButtonText(currentSubscription); // Mettre à jour les boutons
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Erreur lors de la mise à jour de l\'abonnement :', error);
          alert('Erreur serveur. Veuillez réessayer plus tard.');
        }
      });
    });
  });