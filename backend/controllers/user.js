const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = (req, res, next) => {//on compare l'email de la requête avec celui de la base de données
    User.findone({ email: req.body.email })//on trouve l'utilisateur dans la base de données
        .then(user => {//si l'utilisateur n'est pas trouvé
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });//on renvoie une erreur
            }
            bcrypt.compare(req.body.password, user.password)//on compare le mot de passe de la requête avec celui de la base de données
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });//on renvoie une erreur
                    }
                    res.status(200).json({//si l'utilisateur est trouvé et que le mot de passe est correct
                        userId: user._id,
                        token: jwt.sign(//on renvoie un token d'authentification
                            {   userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            })              
                    })
                        .catch(error => res.status(500).json({ error }));
                })             
                .catch(error => res.status(500).json({ error }));  
        })
    };