const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = (req, res, next) => {//fonction login pour la connexion d'un utilisateur
    User.findOne({ email: req.body.email })//on trouve l'utilisateur dans la base de données
        .then(user => {
            if (!user) {//si l'utilisateur n'est pas trouvé dans la base de données 
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)//on compare le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
                .then(valid => {//si la comparaison n'est pas valide
                    if (!valid) {//si la comparaison n'est pas valide 
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });//on renvoie une erreur
                    }
                    res.status(200).json({//si la comparaison est valide 
                        userId: user._id,//on renvoie l'id de l'utilisateur 
                        token: jwt.sign(//on renvoie un token d'authentification 
                            { userId: user._id },//on encode l'id de l'utilisateur dans le token
                            'RANDOM_TOKEN_SECRET',//on encode le token avec une chaîne secrète de développement temporaire
                            { expiresIn: '24h' }//on définit la durée de validité du token à 24 heures
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

//export signup a faire
exports.signup = (req, res, next) => {//fonction signup pour l'enregistrement d'un utilisateur 
    bcrypt.hash(req.body.password, 10)//on hash le mot de passe entré par l'utilisateur avec un salage de 10 tours
    .then(hash => {//on récupère le hash du mot de passe 
        const user = new User({//on crée un nouvel utilisateur avec l'email et le mot de passe hashé
        email: req.body.email,//on récupère l'email entré par l'utilisateur
        password: hash//on récupère le hash du mot de passe
        });
        user.save()//on enregistre l'utilisateur dans la base de données
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};