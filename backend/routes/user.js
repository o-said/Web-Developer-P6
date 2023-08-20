const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

router.post('/signup', User.signup);//on crée une route post pour l'enregistrement d'un utilisateur avec la fonction signup du controller user.js
router.post('/login', User.login);//on crée une route post pour la connexion d'un utilisateur avec la fonction login du controller user.js

module.exports = router;//on exporte le router vers app.js