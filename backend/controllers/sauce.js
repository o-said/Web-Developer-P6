const Sauce = require('../models/Sauces');//on importe le modèle Sauce
const fs = require('fs');//on importe le package fs de node pour avoir accès aux différentes opérations liées aux fichiers

//création d'une sauce 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);//on transforme la chaîne de caractères en objet pour pouvoir récupérer les données
    delete sauceObject._id;//on supprime l'id envoyé par le front-end car il sera créé par le serveur
    const sauce = new Sauce({
        ...sauceObject,//on copie les éléments de sauceObject dans la nouvelle sauce
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//on génère l'url de l'image à partir de la requête
    });
    sauce.save()//on enregistre la sauce dans la base de données 
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))//on envoie une réponse au front-end avec un statut 201
        .catch(error => res.status(400).json({ error }));
}

//modification d'une sauce
exports.modifySauce = (req, res, next) => {//on récupère l'id de la sauce à modifier et le corps de la requête
    const sauceObject = req.file ? //on vérifie si req.file existe ou non dans la requête
        { //si oui
            ...JSON.parse(req.body.sauce),//on transforme la chaîne de caractères en objet pour pouvoir récupérer les données
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//on génère l'url de l'image à partir de la requête
        } : { ...req.body };//si non, on copie req.body dans sauceObject 
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })//on met à jour la sauce dans la base de données
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
}
//suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })//on trouve la sauce dans la base de données 
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];//on récupère le nom du fichier à supprimer à partir de l'url de l'image
            fs.unlink(`images/${filename}`, () => {//on supprime le fichier image du dossier images
                Sauce.deleteOne({ _id: req.params.id })//on supprime la sauce de la base de données 
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
}
//récupération d'une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })//on trouve la sauce dans la base de données 
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}
//récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()//on trouve toutes les sauces dans la base de données
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}
//like ou dislike d'une sauce
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })//on trouve la sauce dans la base de données
        .then(sauce => {
            switch (req.body.like) {//on switch sur le like envoyé par le front-end 
                case 1://si like
                    if (!sauce.usersLiked.includes(req.body.userId)) {//si l'utilisateur n'a pas déjà liké la sauce 
                        Sauce.updateOne({ _id: req.params.id }, {//on met à jour la sauce 
                            $inc: { likes: 1 },//on incrémente le nombre de likes 
                            $push: { usersLiked: req.body.userId }//on ajoute l'id de l'utilisateur dans le tableau des utilisateurs qui ont liké la sauce
                        })
                            .then(() => res.status(200).json({ message: 'Like ajouté !' }))
                            .catch(error => res.status(400).json({ error }));
                    }
                    break;
                case -1://si dislike
                    if (!sauce.usersDisliked.includes(req.body.userId)) {//si l'utilisateur n'a pas déjà disliké la sauce
                        Sauce.updateOne({ _id: req.params.id }, {//on met à jour la sauce
                            $inc: { dislikes: 1 },//on incrémente le nombre de dislikes
                            $push: { usersDisliked: req.body.userId }//on ajoute l'id de l'utilisateur dans le tableau des utilisateurs qui ont disliké la sauce
                        })
                            .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
                            .catch(error => res.status(400).json({ error }));
                    }
                    break;
                case 0://si annulation du like ou du dislike
                    if (sauce.usersLiked.includes(req.body.userId)) {//si l'utilisateur a liké la sauce
                        Sauce.updateOne({ _id: req.params.id }, {//on met à jour la sauce
                            $inc: { likes: -1 },//on décrémente le nombre de likes
                            $pull: { usersLiked: req.body.userId }//on retire l'id de l'utilisateur dans le tableau des utilisateurs qui ont liké la sauce
                        })
                            .then(() => res.status(200).json({ message: 'Like retiré !' }))
                            .catch(error => res.status(400).json({ error }));
                    } else{
                        Sauce.updateOne({ _id: req.params.id }, {//on met à jour la sauce
                            $inc: { dislikes: -1 },//on décrémente le nombre de dislikes
                            $pull: { usersDisliked: req.body.userId }//on retire l'id de l'utilisateur dans le tableau des utilisateurs qui ont disliké la sauce
                        })
                            .then(() => res.status(200).json({ message: 'Dislike retiré !' }))
                            .catch(error => res.status(400).json({ error }));
                    }
            }
        })
}