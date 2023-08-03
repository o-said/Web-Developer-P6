const jwt = require('jsonwebtoken');
//require ('dotenv').config();


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupération du token dans le header de la requête entrante
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Décodage du token grâce à la fonction verify, si le token n'est pas valide une erreur sera générée
        const userId = decodedToken.userId; // Récupération du userId dans le token
        if (req.body.userId && req.body.userId !== userId) { // Si la demande contient un userId, on le compare à celui extrait du token
            throw 'User ID non valable !';
        } else {
            next(); // Si tout est bon, on passe l'exécution de la fonction au middleware suivant
        }
    }catch {
        res.status(401).json({
            error: new Error('Requête non authentifiée !')
        });
    }
};

