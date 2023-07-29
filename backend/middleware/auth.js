const jwt = require('jsonwebtoken');
//require ('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // On récupère le token dans le header de la requête entrante
        const decodedToken = jwt.verify(token, process.env.TOKEN); // On utilise la fonction verify pour décoder le token
        const userId = decodedToken.userId; // On extrait l'ID utilisateur du token
       /* if (req.body.userId && req.body.userId !== userId) { // Si l'ID utilisateur est différent de celui du token
            throw 'User ID non valable !'; // On renvoie une erreur
        } else {*/
        req.auth = {
            userId:userId
        }
        next(); // Sinon, on passe l'exécution à la prochaine fonction
     //   }
    } catch {
        res.status(401).json({ // Si la requête n'est pas authentifiée
            error: new Error('Requête non authentifiée !')
        });
    }
};


