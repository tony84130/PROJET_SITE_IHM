-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mar. 29 avr. 2025 à 14:28
-- Version du serveur :  5.7.34
-- Version de PHP : 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_ihm`
--

-- --------------------------------------------------------

--
-- Structure de la table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `sender_id`, `recipient_id`, `content`, `created_at`) VALUES
(1, 2, 4, 'Salut toi !', '2025-04-24 15:41:14'),
(2, 4, 2, 'ça va ?', '2025-04-24 15:41:55'),
(3, 2, 4, 'Oui merci !', '2025-04-25 12:28:11'),
(4, 2, 1, 'Hey !', '2025-04-25 14:14:13'),
(5, 2, 1, 'ça va ?', '2025-04-25 14:33:55'),
(6, 2, 1, 'Tu rep pas ?', '2025-04-28 11:57:13');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `topic_id`, `user_id`, `content`, `created_at`) VALUES
(1, 1, 1, 'Je pense que l’IA va jouer un rôle majeur dans les IHM de 2025.', '2025-04-24 12:56:43'),
(2, 1, 2, 'Oui, et les interfaces vocales vont devenir plus courantes.', '2025-04-24 12:56:43'),
(3, 2, 1, 'Figma est mon préféré, mais Adobe XD est aussi très puissant.', '2025-04-24 12:56:43'),
(4, 3, 2, 'Il faut absolument respecter les standards WCAG pour l’accessibilité.', '2025-04-24 12:56:43'),
(11, 7, 5, 'Moi c\'est le Japon !!', '2025-04-28 19:18:10'),
(12, 1, 4, 'Est-ce que les interfaces neuronales vont devenir mainstream d’ici 2030 ?', '2025-04-29 14:15:00'),
(13, 1, 2, 'Les interfaces neuronales sont encore expérimentales, mais les avancées comme Neuralink montrent un potentiel. Pour 2025, je parie plus sur des IHM hybrides (gestuelles + vocales).', '2025-04-29 14:18:00'),
(14, 8, 1, 'J’ai vu des prototypes de capteurs 3D pour des interfaces gestuelles, mais est-ce vraiment intuitif ?', '2025-04-29 14:22:00'),
(15, 8, 2, 'Les interfaces gestuelles sont prometteuses, mais elles doivent respecter les principes d’ergonomie. Par exemple, limiter les gestes complexes réduit la fatigue. Des standards comme Leap Motion montrent la voie.', '2025-04-29 14:25:00'),
(16, 8, 4, 'Et pour les malvoyants, comment on intègre l’accessibilité ?', '2025-04-29 14:30:00'),
(17, 8, 2, 'Bonne question ! Pour les malvoyants, on peut coupler les gestes avec des retours haptiques ou sonores, en suivant les guidelines WCAG 2.1.', '2025-04-29 14:35:00'),
(18, 9, 4, 'Comment on rend une IA comme Grok plus “humaine” dans une interface ?', '2025-04-29 14:27:00'),
(19, 9, 2, 'Pour humaniser une IA, il faut travailler sur le ton, la clarté des réponses et des animations subtiles dans l’interface. Par exemple, des micro-interactions comme un indicateur de “réflexion” donnent l’illusion d’une conversation naturelle.', '2025-04-29 14:30:00'),
(20, 9, 5, 'Mais est-ce que ça ne ralentit pas l’interaction ?', '2025-04-29 14:33:00'),
(21, 9, 2, 'Pas forcément. Si les délais sont bien calibrés (moins de 0,5s), l’utilisateur perçoit la fluidité tout en ressentant une “présence”. Des tests A/B peuvent optimiser ça.', '2025-04-29 14:36:00'),
(22, 10, 5, 'Je trouve que les micro-interactions rendent les apps plus fun, mais quand est-ce que ça devient trop ?', '2025-04-29 14:32:00'),
(23, 10, 2, 'Les micro-interactions doivent rester fonctionnelles et ne pas distraire. Une bonne règle : elles doivent guider l’utilisateur ou confirmer une action (ex. : animation de validation). Si elles sont purement décoratives, elles risquent de nuire à l’UX.', '2025-04-29 14:35:00'),
(24, 10, 1, 'Quels outils pour prototyper des micro-interactions ?', '2025-04-29 14:38:00'),
(25, 10, 2, 'Figma avec des plugins comme Motion ou Principle est excellent pour prototyper. Pour des interactions complexes, After Effects peut aussi aider à visualiser.', '2025-04-29 14:41:00'),
(26, 10, 4, 'Et pour les tester auprès des utilisateurs ?', '2025-04-29 14:44:00'),
(27, 10, 2, 'Des outils comme Maze ou Lookback permettent de tester les micro-interactions en contexte. L’important est de mesurer le taux de complétion et la satisfaction utilisateur.', '2025-04-29 14:47:00'),
(28, 11, 1, 'Quels sont les meilleurs outils pour tester l’UX à distance ?', '2025-04-29 14:37:00'),
(29, 11, 2, 'Pour le testing à distance, je recommande UserTesting pour des retours qualitatifs, Maze pour des tests quantitatifs, et Lookback pour des sessions live. Chacun a ses forces selon le type de feedback recherché.', '2025-04-29 14:40:00'),
(30, 11, 4, 'Et comment gérer les biais des participants ?', '2025-04-29 14:43:00'),
(31, 11, 2, 'Les biais sont inévitables, mais on peut les réduire en diversifiant le panel, en posant des questions neutres et en croisant les données quali/quanti. Par exemple, trianguler les résultats de Maze avec des interviews.', '2025-04-29 14:46:00'),
(32, 12, 4, 'Un design system, c’est juste une bibliothèque de composants, non ?', '2025-04-29 14:42:00'),
(33, 12, 2, 'Pas tout à fait. Un design system inclut des composants, mais aussi des guidelines, des principes de design et des outils pour la collaboration. Pensez à Material Design : c’est un écosystème complet pour garantir la cohérence.', '2025-04-29 14:45:00'),
(34, 12, 5, 'Comment convaincre une équipe d’adopter un design system ?', '2025-04-29 14:48:00'),
(35, 12, 2, 'Montrez les gains concrets : gain de temps, cohérence visuelle, moins d’erreurs. Un bon moyen est de commencer par un petit projet pilote pour démontrer la valeur.', '2025-04-29 14:51:00'),
(36, 13, 5, 'La RA, c’est cool, mais comment on conçoit une interface qui ne donne pas mal à la tête ?', '2025-04-29 14:47:00'),
(37, 13, 2, 'Pour éviter la fatigue en RA, il faut limiter la densité d’information et utiliser des contrastes élevés. Les guidelines d’Apple pour Vision Pro insistent sur des interactions naturelles et des pauses visuelles.', '2025-04-29 14:50:00'),
(38, 13, 1, 'Quels cas d’usage concrets pour la RA en IHM ?', '2025-04-29 14:53:00'),
(39, 13, 2, 'La RA excelle dans la formation (ex. : simulations médicales), le commerce (essayage virtuel) et la maintenance (guides interactifs). L’important est d’aligner l’interface sur le contexte de l’utilisateur.', '2025-04-29 14:56:00'),
(40, 14, 1, 'Les interfaces vocales, c’est pratique, mais parfois frustrant. Comment les améliorer ?', '2025-04-29 14:52:00'),
(41, 14, 2, 'Le défi est de rendre les interfaces vocales contextuelles et tolérantes aux erreurs. Par exemple, permettre des commandes ambiguës et offrir des suggestions proactives réduit la frustration. Alexa a bien progressé là-dessus.', '2025-04-29 14:55:00'),
(42, 14, 4, 'Et pour les environnements bruyants ?', '2025-04-29 14:58:00'),
(43, 14, 2, 'Dans les environnements bruyants, il faut des micros directionnels et des algorithmes de suppression de bruit. Côté UX, proposer un fallback visuel (ex. : écran) peut sauver l’interaction.', '2025-04-29 15:01:00'),
(44, 15, 4, 'J’adore les interfaces personnalisées, mais j’ai peur pour mes données. Des solutions ?', '2025-04-29 14:57:00'),
(45, 15, 2, 'La clé est la transparence : informez les utilisateurs sur les données collectées et donnez-leur le contrôle (opt-in/opt-out). Des approches comme le “privacy by design” et le stockage local peuvent aussi rassurer.', '2025-04-29 15:00:00'),
(46, 15, 5, 'Mais est-ce que la personnalisation vaut vraiment le coup ?', '2025-04-29 15:03:00'),
(47, 15, 2, 'Oui, des études montrent que la personnalisation peut augmenter l’engagement de 20-30 %. Mais il faut un équilibre : trop de personnalisation peut sembler intrusif.', '2025-04-29 15:06:00'),
(48, 15, 1, 'Quels outils pour implémenter ça ?', '2025-04-29 15:09:00'),
(49, 15, 2, 'Des plateformes comme Segment ou Amplitude permettent de collecter et d’analyser les données pour personnaliser. Côté design, Figma peut aider à prototyper des flows dynamiques.', '2025-04-29 15:12:00'),
(50, 16, 5, 'Comment repérer un dark pattern dans une interface ?', '2025-04-29 15:02:00'),
(51, 16, 2, 'Les dark patterns manipulent l’utilisateur, comme des compteurs de temps artificiels ou des options par défaut trompeuses. Pour les éviter, suivez des principes éthiques comme ceux de l’UXPA et testez avec de vrais utilisateurs.', '2025-04-29 15:05:00'),
(52, 16, 1, 'Quelles entreprises sont exemplaires en éthique ?', '2025-04-29 15:08:00'),
(53, 16, 2, 'Des entreprises comme Basecamp ou Mozilla mettent l’accent sur la transparence et le respect de l’utilisateur. Leurs guidelines publiques sont de bonnes références.', '2025-04-29 15:11:00'),
(54, 17, 1, 'Qu’est-ce qui rend une interface VR vraiment immersive ?', '2025-04-29 15:07:00'),
(55, 17, 2, 'L’immersion en VR repose sur la fluidité (60 FPS minimum), des interactions intuitives (ex. : gestes naturels) et un sound design spatial. Les tests utilisateurs sont cruciaux pour éviter le motion sickness.', '2025-04-29 15:10:00'),
(56, 17, 4, 'Et pour les casques AR comme Vision Pro ?', '2025-04-29 15:13:00'),
(57, 17, 2, 'Pour l’AR, l’accent est sur l’intégration avec l’environnement réel. Vision Pro utilise des interfaces flottantes et des micro-gestes pour minimiser la charge cognitive. Les guidelines d’Apple sont un bon point de départ.', '2025-04-29 15:16:00'),
(58, 17, 5, 'Quels outils pour prototyper en VR/AR ?', '2025-04-29 15:19:00'),
(59, 17, 2, 'Unity avec XR Interaction Toolkit est top pour prototyper en VR/AR. Pour des mockups rapides, Lens Studio ou Spark AR peuvent suffire.', '2025-04-29 15:22:00');

-- --------------------------------------------------------

--
-- Structure de la table `topics`
--

CREATE TABLE `topics` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `topics`
--

INSERT INTO `topics` (`id`, `title`, `description`, `user_id`, `created_at`) VALUES
(1, 'Les tendances IHM 2025', 'Quelles innovations façonneront les interfaces de demain ? Discutez ici !', 1, '2025-04-24 12:56:43'),
(2, 'Outils de prototypage', 'Comparez Figma, Sketch, Adobe XD et plus encore.', 1, '2025-04-24 12:56:43'),
(3, 'Accessibilité dans les interfaces', 'Comment concevoir des IHM inclusives pour tous ?', 1, '2025-04-24 12:56:43'),
(7, 'Meilleur pays', 'Quel est le pays où vous voulez faire de l\'IHM ?', 5, '2025-04-28 19:17:59'),
(8, 'Interfaces gestuelles en 2025', 'Comment les interfaces sans contact évolueront-elles avec les capteurs avancés ?', 1, '2025-04-29 14:20:00'),
(9, 'Design pour l’IA conversationnelle', 'Comment concevoir des interfaces pour des agents comme Grok ?', 4, '2025-04-29 14:25:00'),
(10, 'Micro-interactions et engagement', 'Quel rôle jouent les micro-interactions dans l’expérience utilisateur ?', 5, '2025-04-29 14:30:00'),
(11, 'UX Testing à distance', 'Quels outils et méthodes pour tester l’UX à distance efficacement ?', 1, '2025-04-29 14:35:00'),
(12, 'Design Systems en 2025', 'Comment les design systems simplifient-ils le travail des équipes IHM ?', 4, '2025-04-29 14:40:00'),
(13, 'Réalité augmentée et IHM', 'Comment la RA redéfinit-elle les interfaces utilisateur ?', 5, '2025-04-29 14:45:00'),
(14, 'Interfaces vocales intuitives', 'Quels défis pour rendre les interfaces vocales plus naturelles ?', 1, '2025-04-29 14:50:00'),
(15, 'Personnalisation UX', 'Comment équilibrer personnalisation et vie privée dans les IHM ?', 4, '2025-04-29 14:55:00'),
(16, 'Éthique en design d’interface', 'Comment éviter les dark patterns et concevoir de manière éthique ?', 5, '2025-04-29 15:00:00'),
(17, 'Interfaces immersives', 'Comment les interfaces pour VR/AR améliorent-elles l’immersion ?', 1, '2025-04-29 15:05:00');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subscription_type` enum('free','premium','enterprise') DEFAULT 'free'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `subscription_type`) VALUES
(1, 'Arnold', 'testuser@example.com', '$2b$10$DQTuduvtlxiEBZfqM6/eKuDN8siWR.MBjwW8Md0ZbGd3DUSerQTaa', '2025-04-24 10:51:56', 'free'),
(2, 'Tony', 'tony.besse.84@gmail.com', '$2b$10$O5IXcGzRzoHR4ldHdG8sMuhndcGj7AxId.TMWZRe0gqUKtjqnpBtm', '2025-04-24 10:59:04', 'premium'),
(3, 'Sylvester', 'tony.besse.841@gmail.com', '$2b$10$kYEY5V7Cw7vp5.obF/0Mc./Xi7OF8rLbNuA7qBPdLcl88zKQhvQPu', '2025-04-24 11:06:58', 'free'),
(4, 'Anatoly', 'toto@gmail.com', '$2b$10$NKYxCkIJ6lVNiJfv2OJNaujmu3OU8iGqAjKj8wCBNuZVhQdlzkuIq', '2025-04-24 15:09:04', 'free'),
(5, 'Alain', 'test@f.fr', '$2b$10$JB.sSWfEBx4hwIQYaLrw1OPQfAoupQ/g8zsSYE/ifFAYQ4BkF7Kpy', '2025-04-28 19:17:01', 'free');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `recipient_id` (`recipient_id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_id` (`topic_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT pour la table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_messages_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
