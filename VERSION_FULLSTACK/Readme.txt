Aperçu du Projet
----------------
Ce projet est une plateforme web dédiée à l'Interface Homme-Machine (IHM), visant à optimiser les interactions utilisateur à travers une conception intuitive et responsive. Les fonctionnalités clés sont un forum et une messagerie privée intégrée, permettant aux utilisateurs de s'inscrire, se connecter, et échanger des messages en temps réel. Le site est construit avec un backend Node.js, un frontend en HTML/CSS/JavaScript, et utilise une base de données MySQL pour stocker les données.

### Fonctionnalités Principales
- Inscription et Connexion : Les utilisateurs peuvent créer un compte et se connecter.
- Forum : Les utilisateurs connectés peuvent voir une liste de sujets, créer de nouveaux sujets, et échanger avec les autres utilisateurs.
- Messagerie Privée : Les utilisateurs connectés peuvent voir une liste de conversations, en démarrer de nouvelles, et échanger des messages.
- Design IHM : Utilisation de couleurs cohérentes, animations subtiles, et disposition ergonomique pour une interaction utilisateur optimale.

Prérequis
---------
Avant de lancer le projet, assurez-vous d'avoir les outils suivants installés sur votre machine :
- Node.js (version 14.x ou supérieure) : Pour exécuter le backend.
- npm (inclus avec Node.js) : Pour gérer les dépendances.
- MySQL (version 5.7 ou supérieure) : Pour la base de données.
- npx (inclus avec npm) : Pour lancer le frontend avec live-server.

Installation
------------
Suivez ces étapes pour configurer et lancer le projet localement.

### 1. Cloner le Projet
Clonez le dépôt Git sur votre machine :
    git clone <URL_DU_DÉPÔT>
    cd <NOM_DU_PROJET>

### 2. Configurer la Base de Données MySQL
1. **Créer la Base de Données** :
   Exécutez le script SQL pour créer la base de données.

2. **Créer les Tables** :
   Exécutez le script SQL pour créer les tables nécessaires (users, chat_messages).

3. **Configurer les Informations de Connexion** :
   - Dans le dossier backend, modifier le fichier db.js pour indiquer les informations de connexion à MySQL :
       DB_HOST=localhost
       DB_USER=root
       DB_PASSWORD=votre_mot_de_passe
       DB_NAME=ihm_messagerie_db

### 3. Installer les Dépendances du Backend
Naviguez dans le dossier backend et installez les dépendances :
    cd backend
    npm install

Assurez-vous que les packages suivants sont inclus dans votre package.json :
- express : Pour le serveur backend.
- mysql2 : Pour la connexion à MySQL.
- cors : Pour gérer les requêtes cross-origin.
- dotenv : Pour charger les variables d'environnement.

### 4. Lancer le Backend
Dans le dossier backend, lancez le serveur Node.js :
    node server

Le serveur backend sera accessible sur http://localhost:5000.

### 5. Lancer le Frontend
Dans le dossier racine du projet (ou là où se trouvent vos fichiers HTML/CSS/JS), lancez le serveur de développement avec live-server :
    npx live-server --port=3012

Le frontend sera accessible sur http://127.0.0.1:3012.

Structure du Projet
-------------------
messagerie-projet/
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   └── routes/
│       └── auth.js
├── frontend/
│   ├── assets/
│   │   ├── jurassic-park-ah.gif
│   │   └── vous_navez_pas_dit_le_mot_magique.mp3
│   ├── categories/
│   │   ├── communaute-inspiration/
│   │   │   └── ...
│   │   ├── formation-apprentissage/
│   │   │   └── ...
│   │   ├── histoire-concepts/
│   │   │   └── ...
│   │   ├── interaction-collaboration/
│   │   │   └── ...
│   │   ├── outils-ihm/
│   │   │   └── ...
│   │   └── ressources-bibliographie/
│   │       └── ...
│   ├── entete_page/
│   │   ├── abonnements-tarification.html
│   │   ├── connexion.html
│   │   └── inscription.html
│   ├── LOGO/
│   │   ├── COMMUNAUTE_INSPIRATION.png
│   │   ├── FORMATION_APPRENTISSAGE.png
│   │   ├── HISTOIRE_CONCEPT_IHM.png
│   │   ├── INTERACTION_COLLABORATION.png
│   │   ├── LOGO_IHM.png
│   │   ├── OUTILS_IHM.png
│   │   └── RESSOURCES_BIBLIOGRAPHIE.png
│   ├── pied_page/
│   │   ├── avis-utilisateurs.html
│   │   ├── contact.html
│   │   ├── foire-aux-questions.html
│   │   ├── forum.html
│   │   ├── mentions-legales.html
│   │   ├── messagerie-instantanee.html
│   │   ├── plan-contenu.html
│   │   ├── qui-sommes-nous.html
│   │   ├── recrutement.html
│   │   ├── réseaux-sociaux.html
│   │   └── topic.html
│   ├── scripts/
│   │   ├── forum.js
│   │   ├── inscription.js
│   │   ├── login.js
│   │   ├── messagerie.js
│   │   ├── pricing.js
│   │   └── topic.js
│   ├── common.js
│   ├── index.html
│   └── styles.css
├── node-modules/
│   └── ...
├── README.txt
├── projet_ihm.sql
├── package-lock.json
└── package.json

Utilisation
-----------
1. **Accéder à l'Application** :
   - Ouvre ton navigateur et va à http://127.0.0.1:3012.

2. **Créer un Compte** :
   - Si tu n'as pas encore d'utilisateur, inscris-toi via une page d'inscription.

3. **Se Connecter** :
   - Connecte-toi via la page de connexion.

4. **Explorer les Fonctionnalités IHM** :
   - Navigue à travers les différentes sections du site (messagerie, forum, etc.) pour découvrir une interface conçue selon les principes d'IHM.

5. **Utiliser le Forum** :
   - Une fois connecté, la liste des topics apparait.
   - Clique sur un topic pour voir les commentaires.
   - Clique sur "Créer un nouveau sujet" pour créer un nouveau topic.
   - Envoie des commentaires via la zone de texte.

6. **Utiliser la Messagerie** :
   - Une fois connecté, la liste des conversations s'affiche à gauche.
   - Clique sur une conversation pour voir les messages.
   - Clique sur "Nouvelle conversation" pour démarrer une discussion avec un autre utilisateur.
   - Envoie des messages via le formulaire en bas de la zone de chat.

Améliorations Futures
---------------------
- **Accessibilité** : Améliorer l'accessibilité (compatibilité avec les lecteurs d'écran, contrastes, etc.) pour une meilleure expérience utilisateur.
- **Tests Utilisateur** : Effectuer des tests IHM pour évaluer l'ergonomie et ajuster l'interface en fonction des retours.

Auteurs
-------
- Tony BESSE