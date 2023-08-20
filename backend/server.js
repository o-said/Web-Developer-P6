const http = require('http');
const app = require('./app');

const normalizePort = val => {//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const port = parseInt(val, 10);

if (isNaN(port)) {
    return val;
}
if (port >= 0) {
    return port;
}
return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {//la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
if (error.syscall !== 'listen') {
    throw error;
}
const address = server.address();//la méthode address renvoie l'adresse sous forme d'objet ou de chaîne de caractères
const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
switch (error.code) {//la fonction switch permet de gérer les différentes erreurs
    case 'EACCES':
    console.error(bind + ' requires elevated privileges.');
    process.exit(1);
    break;
    case 'EADDRINUSE':
    console.error(bind + ' is already in use.');
    process.exit(1);
    break;
    default:
    throw error;
}
};

const server = http.createServer(app);//la fonction createServer du package http de Node permet de créer un serveur avec en argument la fonction app

server.on('error', errorHandler);//la méthode on enregistre des écouteurs d'évènements, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on('listening', () => { 
const address = server.address();//la méthode listen consigne le fait que le serveur attend des connexions ou un port nommé dans la console
const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
console.log('Listening on ' + bind);//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
});

server.listen(port);//la fonction listen met le serveur en attente sur un port ou un canal nommé
