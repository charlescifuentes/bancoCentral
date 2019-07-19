const db = require('../../bd/bd');//Importamos conexion a la base de datos
const sql = db.connection;//Instanciamos conexion para usar con las consultas

//Creamos un objeto de la tabla para proteger y enmascarar los nombres de la base de datos
const table = {
    name    : "cuentas",    
    fields  : {
        id          :   "id_cuenta",
        cliente     :   "id_cliente",
        tipo        :   "tipo_cuenta",
        saldo       :   "saldo_cuenta",
        sobregiro   :   "saldo_sobregiro"
    }
}
//Creamos la clase Cuenta para empezar a crear las respectivas funcionalidades.
class Cuenta {
    //Pasamos las variables globales por referencia
    constructor(id,cliente,tipo,saldo,sobregiro) {
        if (id) {
            this.id     = id;    
        } 
        this.cliente = cliente       
        this.tipo    = tipo;
        this.saldo  = saldo;
        this.sobregiro  = sobregiro;
    }
    //Funcion encargada de Mapear los campos de la base de datos en el orden que estan segun la super clase, con el fin de enmascarar los campos de la base de datos
    static mapFactory(entity){
        let mp = {};
        if(entity){
            mp = new Cliente(
                entity.id_cliente,
                entity.nombre_cliente,
                entity.documento_cliente,
                entity.profesion_cliente
            );
        }        
        return mp;
    }
    //Funcion que consulta un cliente segun el id de la base de datos
    static consultarCliente(id, callback) {
        //Armamos la consulta segn los parametros que necesitemos
        let query = 'SELECT * ';
        query += 'FROM '+table.name+' ';
        query += 'WHERE '+table.fields.id+'='+id+';';   
        //Verificamos la conexion
        if(sql){
            sql.query(query, (err, result) => {
                if(err){
                    throw err;
                }else{     
                    let cliente = Cliente.mapFactory(result[0]);                                                                                          
                    console.log(cliente);                          
                    callback(null,cliente);
                }
            })
        }else{
            throw "Problema conectado con Mysql en consultarCliente";
        } 
    }
    //Funcion encargada de consultar todos los clientes de la base de datos
    static consultarClientes(callback) {
        //Armamos la consulta segn los parametros que necesitemos
        let query = 'SELECT * ';
        query += 'FROM '+table.name+';';   
        //Verificamos la conexion
        if(sql){
            sql.query(query, (err, result) => {
                if(err){
                    throw err;
                }else{     
                    let clientes = [];
                    for(let entity of result){
                        let cliente = Cliente.mapFactory(entity);                        
                        clientes.push(cliente);
                    }                                              
                    console.log(clientes);                          
                    callback(null,clientes);
                }
            })
        }else{
            throw "Problema conectado con Mysql";
        } 
    }
}

module.exports = Cliente;