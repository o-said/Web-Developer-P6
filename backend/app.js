require('dotenv').config();//on importe dotenv pour masquer les informations sensibles
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');//on importe le package path de node pour avoir accès au chemin de notre système de fichiers

const userRoutes = require('./routes/user');//on importe le routeur user
const sauceRoutes = require('./routes/sauce');//on importe le routeur sauce

require('dotenv').config();//on importe dotenv pour masquer les informations sensibles

mongoose.connect(process.env.MONGO_URL,//on se connecte à la base de données MongoDB
    { useNewUrlParser: true,//on utilise le nouveau parser d'URL pour se connecter à MongoDB
        useUnifiedTopology: true,//on utilise le nouveau moteur de monitoring et de découverte de serveur
        
        
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
    //on se connecte à la base de données MongoDB

//on ajoute des headers à notre objet réponse pour permettre à notre application d'accéder à notre API depuis n'importe quelle origine


app.use((req, res, next) => {//on ajoute des headers à notre objet réponse pour permettre à notre application d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');//on ajoute des headers à notre objet réponse pour permettre à notre application d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//on ajoute des headers à notre objet réponse pour permettre à notre application d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//on ajoute des headers à notre objet réponse pour permettre à notre application d'accéder à notre API depuis n'importe quelle origine
    next();
});

app.use(bodyParser.json());//on utilise le package body-parser pour transformer le corps de la requête en objet JavaScript utilisable

app.use('/images', express.static(path.join(__dirname, 'images')));//on utilise le middleware express.static pour servir le dossier images à chaque requête vers la route /images

app.use('/api/auth', userRoutes);//on utilise le routeur user pour toutes les demandes effectuées vers /api/auth

app.use('/api/sauces', sauceRoutes);//on utilise le routeur sauce pour toutes les demandes effectuées vers /api/sauces

module.exports = app;//on exporte l'application pour y accéder depuis les autres fichiers du projet

