const multer = require('multer'); // Importation du package multer pour la gestion des fichiers entrants dans les requêtes HTTP


// Création d'un dictionnaire des types MIME pour définir le format des images
const MIME_TYPES = {//dictionnaire des types MIME qui associe les extensions de fichier aux types MIME
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
        
};
// Création d'un objet de configuration pour multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => { 
        callback(null, 'images') // Destination des fichiers dans le dossier images

    },
    filename: (req, file, callback) => {// Création du nom du fichier
        const name = file.originalname.replace(' ','_'); // Remplacement des espaces par des underscores
        const extension = MIME_TYPES[file.mimetype]; // Récupération du type MIME du fichier grâce au dictionnaire MIME_TYPES 
        if (extension === 'svg' ||       
            extension === 'webp' || 
            extension === 'gif' || 
            extension === 'png' || 
            extension === 'jpg' || 
            extension === 'jpeg') {
            callback(null, name + Date.now() + '.' + extension); // Création du nom du fichier pour éviter les doublons de nom de fichier
        }else{
            console.log('Type de fichier non autorisé');           
        }
    }
});

module.exports = multer({storage: storage}).single('image'); // Exportation du middleware multer configuré pour gérer uniquement les téléchargements de fichiers image