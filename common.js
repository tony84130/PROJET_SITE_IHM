// Fonction pour insérer la barre de navigation supérieure
function loadNav() {
    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        navContainer.innerHTML = `
            <nav>
                <a href="/entete_page/connexion.html">Connexion</a>
                <a href="/entete_page/inscription.html">Inscription</a>
                <a href="/entete_page/abonnements-tarification.html">Abonnements et tarification</a>
            </nav>
        `;
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
                        <a href="/categories/ressources-bibliographie/bibliotheque-ressources.html">Bibliothèque de ressources (articles, livres, vidéos)</a>
                        <a href="/categories/ressources-bibliographie/bibliographie-commentee.html">Bibliographie commentée</a>
                        <a href="/categories/ressources-bibliographie/bibliotheque-assets.html">Bibliothèque d’assets (templates, icônes, images)</a>
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
                <input type="text" class="search-bar" placeholder="Search">
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

// Appeler toutes les fonctions au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadNav();
    loadCategoryNav();
    loadHeader();
    loadFooter();
});