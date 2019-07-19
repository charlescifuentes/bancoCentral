let Cuenta = require('../modelos/cuenta.js');//Importamos la clase modelo
//Creamos la clase controladora para manejar la informacion de las cuentas
class CuentaControlador {
    constructor() {   
    }
    //Funcion encargada de manejar la consulta de una cuenta por id cuenta e id cliente
    consultaCuenta(req, res) {
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