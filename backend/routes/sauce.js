const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');

const multer = require('../middleware/multer-config'); // Importation du middleware multer pour la gestion des fichiers images
const authentification = require('../middleware/auth'); // Importation du middleware d'authentification

//routes des sauces
router.post('/', authentification, multer, sauceCtrl.createSauce); // Création d'une sauce
router.put('/:id', authentification, multer, sauceCtrl.modifySauce); // Modification d'une sauce
router.delete('/:id', authentification, sauceCtrl.deleteSauce); // Suppression d'une sauce
router.get('/:id', authentification, sauceCtrl.getOneSauce); // Récupération d'une sauce
router.get('/', authentification, sauceCtrl.getAllSauces); // Récupération de toutes les sauces
router.post('/:id/like', authentification, sauceCtrl.likeSauce); // Like ou dislike d'une sauce

module.exports = router;