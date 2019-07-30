const express    = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//Instanciamos express como servidor para empezar a utilizar su potencia
const app = express();
//Uso de Body Parser Para manejo de la informacion que viaja por las peticiones http al servidor
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Llamada al Frontend
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9000");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE,POST,GET,OPTIONS,PUT,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials","true" )
    res.header('Access-Control-Max-Age: 0'); 
    next();
  });

//Importamos la libreria o modulo router mandandole como parametro la instancia de servidor express
require('./api/router.js')(app);
//Iniciamos el servidor escuchando por un puerto  
app.listen(9000, function(){
    console.log('EL servidor esta corriendo por el puerto 9000');
});