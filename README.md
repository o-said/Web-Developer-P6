
## Introduction

Nous installons tous les modules nécéssaires au backend dans ce repo :

1. node.js tout d'abord pour initialiser le repo;

2. git, installation du repo sur github;

3. express et mongoose pour mongoDB;

4. helmet, dotenv, multer;

5. bcrypt, Json Web Tokens (JWT)



### Node.js

Nous utilisons ici node.js pour construire le backend et ainsi ajouter les modules nécéssaires;

Afin de lancer ce programme, si vous avez les clés du fichier .env (voire ensuite), vous devez cloner le frontend openclassrooms disponible sur https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

Dans un terminal dans le dossier du frontend, lancez "ng serve".

Dans le dossier de ce backend, dans un terminal lancez "nodemon server".


### Express()

Nous utilisons express() pour la configuration du router. Express est un module de node.js et un framework JS. Express permet d'appliquer le CRUD à notre application.


### Mongoose

Mongoose facilite la communication avec une base de donnée mongoDB ; mongoose est conçu pour node.js dont il est un module. Créer un schéma, appliquer le CRUD avec notre base de donnée, 
Utilisation de dotenv pour securiser l'acces a mongoDB.

### Multer

Multer récupère et stocke sur le serveur les fichiers envoyés par les utilisateurs. Ici, il est configuré de manière à stocker dans le dossier images/ les images de sauces proposées par chaque utilisateur.

## modules de sécurité sur node.js

### Dotenv

Dotenv permet de travailler avec des variables d'environnement et sécuriser les mots de passe d'un backend node.js.

### Helmet

Helmet permet a l'application de respecter les recommandations OWASP.

### JWT : JSON Web Tokens

JWT est un module node.js qui permet de crypter les tokens d'authentification envoyés au client pour authentifier leur session, selon une clé définie par le développeur. Cette clé est généralement stockée dans le fichier .env.

### bcrypt

Bcrypt permet de faire un "hash" du mot de passe du client, de maniere a ce que cette chaine de caractère ne soit pas stockées coté serveur (mais seulement ce hash). Ainsi lorsque l'utilisateur se connecte avec son mot de passe, ce mot de passe est de nouveau haché et comparé au hash du serveur. Si les deux hash viennent du même mot de passe, les hash se reconnaitront.

### Email-validator et password-validator
Email Validator est un outil logiciel conçu pour vérifier la validité des adresses e-mail. Il analyse les adresses e-mail fournies, en vérifiant leur syntaxe, leur formatage et en les comparant à une liste de règles prédéfinies. Cet outil permet de filtrer les adresses incorrectes, ce qui contribue à améliorer la qualité des listes d'envoi et à éviter les erreurs de saisie. Certains validateurs d'e-mails peuvent également vérifier la disponibilité du serveur de messagerie associé à chaque adresse, assurant ainsi une validation plus complète. L'utilisation d'un Email Validator est courante dans les applications de marketing, les systèmes d'inscription en ligne et d'autres domaines où la précision des adresses e-mail est cruciale.

Un Password Validator est un outil logiciel qui évalue la robustesse des mots de passe en vérifiant divers critères de sécurité. Il analyse les mots de passe fournis en examinant des aspects tels que la longueur, la présence de caractères spéciaux, de chiffres et de lettres majuscules et minuscules. L'objectif est d'encourager la création de mots de passe forts, résistants aux attaques par force brute ou par d'autres méthodes de piratage. Certains Password Validators peuvent également vérifier si un mot de passe figure dans des listes de mots de passe couramment utilisés, renforçant ainsi la sécurité en évitant l'utilisation de mots de passe trop communs. L'intégration d'un Password Validator est souvent recommandée dans les systèmes d'authentification en ligne pour renforcer la sécurité des comptes utilisateurs.



