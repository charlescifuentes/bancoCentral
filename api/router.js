//const ClienteControlador = require('../app/controladores/clienteControlador.js');//Importamos la clase controlador
//Indicamos que es un modulo que se va a usar desde afuera y recibe como parametro la instancia de app para implementar sus funciones
module.exports = (app) => {
/*Recurso clientes encargado de consultar un cliente segun el id en base de datos
app.get('/clientes/:id', function(req, res) { 
    ClienteControlador.consultaCliente(req, res);
});
//Recurso Clientes encargado de consultar todos los clientes de la base de datos
app.get('/clientes', function(req, res){
    ClienteControlador.consultaClientes(req, res);
});*/
//Recurso raiz que me devuelve un json con la estructura de una persona
app.get('/', function (req, res) {
    let persona = {
        'nombre': 'Orlando',
        'edad'  : 30
    };
    res.send(persona);
  });
//Recurso Personas que me devuele por el metodo POST la estructura de una persona segun los datos que llegan
app.post('/personas', (req, res) => {
    let nombre = req.body.nombre;
    let edad   = req.body.edad;
    let miPersona = {
        'elNombre' : nombre,
        'laEdad'   : edad
    };
    res.send(miPersona);
});

}