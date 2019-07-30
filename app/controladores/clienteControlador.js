let Cliente = require('../modelos/cliente.js');//Importamos la clase modelo
//Creamos la clase controladora para manejar la informacion de los clientes
class ClienteControlador {
    constructor() {   
    }
    //Funcion encargada de manejar la consulta de un cliente por id
    consultaCliente(req, res) {
        let id = req.params.id;
        Cliente.consultarCliente(id, (err, data) => {
                if(data){
                    res.json(data);
                }else{
                    res.send(err);
                }
            })
    }
    // Funcion encargada de manejar al consulta de todos los clientes de la base de datos
    consultaClientes(req, res) {
        Cliente.consultarClientes((err, data) => {
                if(data){
                    res.json(data);
                }else{
                    res.send(err);
                }
            })
    }  
}
const instanciaControlador = new ClienteControlador();
module.exports  = instanciaControlador;