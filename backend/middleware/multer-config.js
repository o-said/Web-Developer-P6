const multer = require('multer'); // Importation du package multer


// Création d'un dictionnaire des types MIME
const MIME_TYPES = {
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
        callback(null, 'images') // Destination des fichiers

    },
    filename: (req, file, callback) => {
        const name = file.originalname.replace(' ','_'); // Remplacement des espaces par des underscores
        const extension = MIME_TYPES[file.mimetype]; // Récupération du type MIME
        if (extension === 'svg' ||       
            extension === 'webp' || 
            extension === 'gif' || 
            extension === 'png' || 
            extension === 'jpg' || 
            extension === 'jpeg') {
            callback(null, name + Date.now() + '.' + extension); // Création du nom du fichier
        }else{
            console.log('Type de fichier non autorisé');           
        }
    }
});

module.exports = multer({storage: storage}).single('image'); // Exportation du middleware multer configuré