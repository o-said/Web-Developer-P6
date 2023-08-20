const passValidator = require('password-validator');//on importe le package password-validator qui permet de définir des règles de validation pour les mots de passe
const passSchema = new passValidator();//on crée un schéma de mot de passe avec le package password-validator qui permet de définir des règles de validation pour les mots de passe
passSchema//on définit le schéma de mot de passe avec le package password-validator qui permet de définir des règles de validation pour les mots de passe
    .is().min(8) // longueur minimum 8
    .is().max(100) // longueur maximum 100
    .has().uppercase() //  doit avoir des lettres majuscules
    .has().lowercase() // doit avoir des lettres minuscules
    .has().digits(2) // doit avoir au moins 2 chiffres
    .has().not().spaces() // ne doit pas avoir d'espaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // inerdit ces valeurs
module.exports = passSchema;//on exporte le schéma de mot de passe avec le package password-validator qui permet de définir des règles de validation pour les mots de passe