const express    = require('express');
const bodyParser = require('body-parser');
//Instanciamos express como servidor para empezar a utilizar su potencia
const app = express();
//Uso de Body Parser Para manejo de la informacion que viaja por las peticiones http al servidor
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Importamos la libreria o modulo router mandandole como parametro la instancia de servidor express
require('./api/router.js')(app);
//Iniciamos el servidor escuchando por un puerto  
app.listen(9000, function(){
    console.log('EL servidor esta corriendo por el puerto 9000');
});