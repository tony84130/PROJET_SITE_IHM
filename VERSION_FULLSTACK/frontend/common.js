// Fonction pour insérer la barre de navigation supérieure
function loadNav() {
    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            navContainer.innerHTML = `
                <nav>
                    <span>Bonjour, ${user.name} !</span>
                    <a href="/entete_page/abonnements-tarification.html">Abonnements et tarification</a>
                    <a href="#" id="logout-link">Déconnexion</a>
                </nav>
            `;
            document.getElementById('logout-link').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('user');
                window.location.href = '/entete_page/connexion.html';
            });
        } else {
            navContainer.innerHTML = `
                <nav>
                    <a href="/entete_page/connexion.html">Connexion</a>
                    <a href="/entete_page/inscription.html">Inscription</a>
                    <a href="/entete_page/abonnements-tarification.html">Abonnements et tarification</a>
                </nav>
            `;
        }
    }
}

// Fonction pour insérer la barre de navigation des catégories
function loadCategoryNav() {
    const categoryNavContainer = document.getElementById('category-nav-container');
    if (categoryNavContainer) {
        categoryNavContainer.innerHTML = `
            <div class="category-nav">
                <div class="category-item">
                    <a href="/categories/histoire-concepts/histoire-concepts.html">Histoire et Concepts de l'IHM</a>
                    <div class="dropdown">
                        <a href="/categories/histoire-concepts/apercu-historique.html">Aperçu historique</a>
                        <a href="/categories/histoire-concepts/concepts-cles.html">Concepts clés</a>
                        <a href="/categories/histoire-concepts/quizz-interactif.html">Quizz interactif</a>
                    </div>
                </div>
                <div class="category-item">
                    <a href="/categories/ressources-bibliographie/ressources-bibliographie.html">Ressources et Bibliographie</a>
                    <div class="dropdown">
                        <a href="/categories/ressources-bibliographie/bibliotheque-ressources.html">Bibliothèque de ressources</a>
                        <a href="/categories/ressources-bibliographie/bibliographie-commentee.html">Bibliographie commentée</a>
                        <a href="/categories/ressources-bibliographie/bibliotheque-assets.html">Bibliothèque d’assets</a>
                        <a href="/categories/ressources-bibliographie/analyses-comparatives.html">Analyses comparatives</a>
                    </div>
                </div>
                <div class="category-item">
                    <a href="/categories/outils-ihm/outils-ihm.html">Outils pour l'IHM</a>
                    <div class="dropdown">
                        <a href="/categories/outils-ihm/outils-developpement.html">Outils de développement</a>
                        <a href="/categories/outils-ihm/outils-conception.html">Outils de conception</a>
                        <a href="/categories/outils-ihm/interfaces-basiques.html">Exemples d’interfaces basiques</a>
                    </div>
                </div>
                <div class="category-item">
                    <a href="/categories/formation-apprentissage/formation-apprentissage.html">Formation et Apprentissage</a>
                    <div class="dropdown">
                        <a href="/categories/formation-apprentissage/cours.html">Cours</a>
                        <a href="/categories/formation-apprentissage/exercices-programmation.html">Exercices de programmation</a>
                        <a href="/categories/formation-apprentissage/exercices-conception.html">Exercices de conception</a>
                        <a href="/categories/formation-apprentissage/suivi-evaluation.html">Suivi et évaluation</a>
                        <a href="/categories/formation-apprentissage/planning-cours-visuel.html">Planning de cours visuel</a>
                        <a href="/categories/formation-apprentissage/autres-formations.html">Autres formations en ligne</a>
                        <a href="/categories/formation-apprentissage/tests-analyse.html">Tests et analyse</a>
                    </div>
                </div>
                <div class="category-item">
                    <a href="/categories/communaute-inspiration/communaute-inspiration.html">Communauté et Inspiration</a>
                    <div class="dropdown">
                        <a href="/categories/communaute-inspiration/acteurs-ihm.html">Acteurs de l’IHM</a>
                        <a href="/categories/communaute-inspiration/interviews-experts.html">Interviews d’experts</a>
                        <a href="/categories/communaute-inspiration/entreprises-partenaires.html">Entreprises partenaires</a>
                        <a href="/categories/communaute-inspiration/projets-inspirants.html">Projets inspirants</a>
                        <a href="/categories/communaute-inspiration/success-stories.html">Success stories</a>
                        <a href="/categories/communaute-inspiration/portfolios-freelances.html">Portfolios de freelances</a>
                        <a href="/categories/communaute-inspiration/groupes-discussion.html">Groupes de discussion</a>
                    </div>
                </div>
                <div class="category-item">
                    <a href="/categories/interaction-collaboration/interaction-collaboration.html">Interaction et Collaboration</a>
                    <div class="dropdown">
                        <a href="/categories/interaction-collaboration/chatbot-assistance.html">Chatbot et assistance en ligne</a>
                        <a href="/categories/interaction-collaboration/notifications.html">Notifications</a>
                        <a href="/categories/interaction-collaboration/partage-conceptions.html">Partage de conceptions</a>
                        <a href="/categories/interaction-collaboration/elements-consultes.html">Éléments les plus consultés</a>
                    </div>
                </div>
            </div>
        `;
    }
}

// Fonction pour insérer l'en-tête
function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header>
                <a href="/index.html" class="logo">
                    <img src="/LOGO/LOGO_IHM.png" alt="Logo IHM">
                </a>
                <h1>Explorez l'avenir de l'IHM</h1>
                <input type="text" class="search-bar" placeholder="Rechercher">
            </header>
        `;
    }
}

// Fonction pour insérer le pied de page
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer>
                <a href="/pied_page/contact.html">Contact</a>
                <a href="/pied_page/reseaux-sociaux.html">Réseaux sociaux</a>
                <a href="/pied_page/forum.html">Forum</a>
                <a href="/pied_page/messagerie-instantanee.html">Messagerie instantanée</a>
                <a href="/pied_page/qui-sommes-nous.html">Qui sommes nous</a>
                <a href="/pied_page/mentions-legales.html">Mentions légales</a>
                <a href="/pied_page/avis-utilisateurs.html">Avis de utilisateurs</a>
                <a href="/pied_page/foire-aux-questions.html">Foire aux questions</a>
                <a href="/pied_page/plan-contenu.html">Plan du contenu</a>
                <a href="/pied_page/recrutement.html">Recrutement</a>
            </footer>
        `;
    }
}

// Fonction pour gérer le changement de contenu Actualités/Événements
function showContent(type) {
    const newsContent = document.querySelector('.news-content');
    const eventsContent = document.querySelector('.events-content');
    const buttons = document.querySelectorAll('.mini-nav-button');

    // Supprimer la classe active de tous les contenus et boutons
    newsContent.classList.remove('active');
    eventsContent.classList.remove('active');
    buttons.forEach(button => button.classList.remove('active'));

    // Ajouter la classe active au contenu et au bouton correspondant
    document.querySelector(`.${type}-content`).classList.add('active');
    document.querySelector(`.mini-nav-button[onclick="showContent('${type}')"]`).classList.add('active');
}

// Fonction pour gérer la modale "En savoir plus" et "S'inscrire"
function handleInfoModal() {
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalAction = document.getElementById('modal-action');
    const closeModalButtons = document.querySelectorAll('.close-modal, .modal-close-button');
    const infoButtons = document.querySelectorAll('.news-link, .event-link');

    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            modalTitle.textContent = button.getAttribute('data-title');
            modalDescription.textContent = button.getAttribute('data-description');

            // Personnaliser l'action selon le type
            if (type === 'event') {
                modalAction.innerHTML = `
                    <form id="register-form">
                        <input type="email" placeholder="Votre email" required aria-label="Entrez votre adresse email pour l'inscription">
                        <button type="submit">Confirmer l'inscription</button>
                    </form>
                `;
                const form = document.getElementById('register-form');
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Inscription confirmée ! Vous recevrez un email de confirmation.');
                    modal.style.display = 'none';
                });
            } else {
                modalAction.innerHTML = `<p>Restez à l'écoute pour plus de détails !</p>`;
            }

            modal.style.display = 'flex';
        });
    });

    // Fermer la modale
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });

    // Fermer en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
}

// Animations des cartes
function animateCards() {
    const cards = document.querySelectorAll('.section-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
}

// Particules en arrière-plan
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(0, 121, 107, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0, 121, 107, 0.2)';
                    ctx.lineWidth = 1;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
            if (particlesArray[i].size <= 0.2) {
                particlesArray.splice(i, 1);
                i--;
                particlesArray.push(new Particle());
            }
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Effet d'onde sur les cartes
function addRippleEffect() {
    const cards = document.querySelectorAll('.section-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            card.appendChild(ripple);
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
}

// Animation des compteurs
function animateStats() {
    const animateCounter = (element, start, end, duration, suffix = '') => {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = progress * (end - start) + start;
            element.textContent = value.toFixed(1) + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    const statsSection = document.querySelector('.stats');
    const satisfaction = document.getElementById('satisfaction');
    const success = document.getElementById('success');
    const progressBar = document.getElementById('progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(satisfaction, 0, 4.8, 2000);
                animateCounter(success, 0, 95, 2000, '%');
                progressBar.style.width = '95%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Animation de la barre de recherche
function animateSearchBar() {
    const searchBar = document.querySelector('.search-bar');
    searchBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && searchBar.value.trim() !== '') {
            searchBar.classList.add('bounce');
            searchBar.addEventListener('animationend', () => {
                searchBar.classList.remove('bounce');
            }, { once: true });
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadNav();
    loadCategoryNav();
    loadHeader();
    loadFooter();
    initParticles();
    animateCards();
    addRippleEffect();
    animateStats();
    animateSearchBar();
    handleInfoModal();
});