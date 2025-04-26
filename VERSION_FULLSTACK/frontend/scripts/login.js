document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Connexion réussie
        alert(data.message);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/index.html';
      } else {
        // Échec de la connexion : afficher le GIF et jouer la musique
        const gifOverlay = document.getElementById('gif-overlay');
        gifOverlay.style.display = 'flex';
  
        const audio = document.getElementById('magic-word-audio');
        audio.play();
  
        // Afficher le message d'erreur en dessous du GIF
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = "Email ou mot de passe incorrect.";//data.message; // Affiche "Email ou mot de passe incorrect."
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      alert('Erreur serveur. Veuillez réessayer plus tard.');
    }
});
  
// Gérer la fermeture du GIF
document.getElementById('close-gif').addEventListener('click', function () {
    const gifOverlay = document.getElementById('gif-overlay');
    gifOverlay.style.display = 'none';

    const audio = document.getElementById('magic-word-audio');
    audio.pause();
    audio.currentTime = 0;

    // Réinitialiser le message d'erreur
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
});