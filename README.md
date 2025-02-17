<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="./src/assets/argentBankLogo.png" alt="Logo" width="200">
  </a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table des matières</summary>
  <ol>
    <li><a href="#a-propos-du-projet">À propos du projet</a></li>
    <li><a href="#technologies-utilisees">Technologies utilisées</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#utilisation">Utilisation</a></li>
    <li><a href="#documentation-api">Documentation API</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## À propos du projet

**ArgentBank** est le projet 13/14 de ma formation OpenClassroom.

### Mission :

En tant que développeur chez **Remede Agency**, une agence spécialisée dans le développement d'applications web, vous avez un nouveau projet : Il concerne une nouvelle banque qui démarre, Argent Bank, qui essaie de percer dans le secteur et qui a besoin d'aide pour mettre en place son application.

Un contrat en deux parties qui se décompose en plusieurs phases :

- **Phase 1** : Authentification des utilisateurs - Création d'une application web permettant aux clients de se connecter et de gérer leurs comptes et leur profil.
- **Phase 2** : Transactions - Il s’agirait de spécifier les endpoints d’API nécessaires pour une éventuelle deuxième mission une fois que nous aurons terminé la première.

### Particularités :

- **Documentation complète** avec un ReadMe, **JSDoc**, et des **PropTypes** pour une meilleure collaboration au sein de l'équipe.
- Interface utilisateur réactive et intuitive.

### Concernant la Phase 2 : Gestion des transactions via l'API

Dans la phase 2 du projet, une réflexion approfondie a été menée sur la gestion des transactions des utilisateurs via des endpoints API. L'objectif était de permettre aux utilisateurs d'accéder à leurs transactions, d'en créer de nouvelles, de les modifier ou de les supprimer. Voici les principaux endpoints créés et documentés via **Swagger** :

- **GET /transactions/current-month** : Récupère toutes les transactions du mois en cours, groupées par compte. Ce endpoint permet aux utilisateurs d'avoir une vue d'ensemble des transactions mensuelles avec des détails comme l'ID de la transaction, la date, le montant, la catégorie et des notes ajoutées par l'utilisateur.

- **GET /transactions/details/{transactionId}** : Permet de récupérer les détails d'une transaction spécifique en fournissant son ID. Cela inclut les informations telles que le type de transaction, la catégorie, et toute note personnelle ajoutée.

- **POST /transactions/new-transaction** : Endpoint permettant la création d'une nouvelle transaction. L'utilisateur peut spécifier le compte associé, le montant, la date, la description et d'autres informations comme la catégorie de la transaction et une note personnalisée.

- **PUT /transactions/update/{transactionId}** : Ce endpoint permet de mettre à jour les informations d'une transaction existante, y compris le montant, la date, la description et d'autres détails modifiables. Il est également possible de retirer ou de modifier la catégorie et les notes associées.

Ces endpoints sont documentés dans **Swagger** pour permettre une exploration facile et des tests via l'interface Swagger UI. Ils respectent les normes de sécurité avec l'authentification **JWT**, garantissant que seules les personnes authentifiées peuvent interagir avec leurs transactions.

<img src="./src/assets/edit-user-name.png" alt="homepage" width="500">
<img src="./src/assets/swagger_screen.png" alt="homepage" width="500">

## Technologies utilisées

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

## Installation

### Étapes pour configurer le projet :

1. **Cloner le dépôt du projet** :

   ```bash
   git clone https://github.com/AnthonyHaye/ArgentBank.git
   ```

2. **Cloner le dépôt de l'API** et suivre le ReadMe pour démarrer le serveur backend :

   ```bash
   git clone https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API.git
   ```

3. **Installer les dépendances du projet** :

   ```bash
   npm install
   ```

4. **Lancer l'application en mode développement** :
   ```bash
   npm run dev
   ```

### Gestion des données

- Assurez-vous que le serveur backend est en cours d'exécution avant d'accéder à l'application.

## Utilisation

- Après avoir lancé l'application, ouvrez votre navigateur à l'adresse `http://localhost:3000`.
- Connectez-vous avec vos identifiants pour accéder à l'interface de gestion de votre compte.

## Documentation API

- La documentation de l'API est disponible [ici](http://localhost:3001/api-docs) lorsque le serveur backend est en cours d'exécution. Utilisez Swagger pour explorer les endpoints disponibles et tester les requêtes.

## Contact

- Anthony Hayé - [GitHub](https://github.com/AnthonyHaye)
