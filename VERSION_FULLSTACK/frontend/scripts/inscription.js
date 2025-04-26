document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    console.log('Formulaire soumis'); // Ajout pour déboguer
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    console.log('Données du formulaire :', { name, email, password, confirmPassword }); // Ajout pour déboguer
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
  
      console.log('Réponse du serveur :', response); // Ajout pour déboguer
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message);
        window.location.href = '/entete_page/connexion.html';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      alert('Erreur serveur. Veuillez réessayer plus tard.');
    }
  });