const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // mongoose-unique-validator est un plugin qui ajoute une validation de pré-enregistrement pour les champs uniques dans un schéma Mongoose.

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // unique : true n'est pas un validateur, c'est juste un raccourci pour créer un index en arrière-plan
    password: { type: String, required: true }//on définit le schéma de mot de passe avec le package password-validator qui permet de définir des règles de validation pour les mots de passe
});

userSchema.plugin(uniqueValidator); // mongoose-unique-validator est un plugin qui ajoute une validation de pré-enregistrement pour les champs uniques dans un schéma Mongoose.

module.exports = mongoose.model('User', userSchema); // Le premier argument est le nom singulier de la collection à laquelle votre modèle est destiné. Mongoose recherche automatiquement la version plurielle et minuscule du nom de votre modèle. Ainsi, pour l'exemple ci-dessus, le modèle Réservoir est pour la collection de réservoirs dans la base de données.
