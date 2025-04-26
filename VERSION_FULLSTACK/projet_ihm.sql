-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 25 avr. 2025 à 15:44
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
(5, 2, 1, 'ça va ?', '2025-04-25 14:33:55');

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
(8, 5, 2, 'c\'est cool !', '2025-04-24 13:39:02'),
(9, 5, 4, 'Je n\'ai pas compris le sujet ...', '2025-04-24 15:09:49'),
(10, 6, 2, 'Trop bien !!! :p', '2025-04-25 14:34:44');

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
(5, 'Nouveau sujet !', 'je ne sais pas ce que je vais dire mais c\'est un nouveau sujet !', 2, '2025-04-24 13:38:52'),
(6, 'My new topic !! :Dd', 'blabla', 2, '2025-04-25 14:34:34');

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
(4, 'Anatoly', 'toto@gmail.com', '$2b$10$NKYxCkIJ6lVNiJfv2OJNaujmu3OU8iGqAjKj8wCBNuZVhQdlzkuIq', '2025-04-24 15:09:04', 'free');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
