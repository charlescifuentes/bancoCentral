const db = require('../../bd/bd');//Importamos conexion a la base de datos
const sql = db.connection;//Instanciamos conexion para usar con las consultas

//Creamos un objeto de la tabla para proteger y enmascarar los nombres de la base de datos
const table = {
    name_cuentas    : "cuentas",
    name_clientes   : "clientes",    
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
                entity.id_cuenta,
                entity.id_cliente,
                entity.tipo_cuenta,
                entity.saldo_cuenta,
                entity.saldo_sobregiro
            );
        }        
        return mp;
    }
    //Funcion que consulta una cuenta segun el id del cliente
    static consultarCuenta(id, callback) {
        //Armamos la consulta segn los parametros que necesitemos
        let query = 'SELECT * ';
        query += 'FROM '+table.name_cuentas+' ';
        query += 'JOIN '+table.name_clientes+' ';
        query += 'ON '+table.name_clientes+'.'+table.fields.cliente+' = '+table.name_cuentas+'.'+table.fields.cliente+' ';
        query += 'WHERE '+table.fields.cliente+'='+id+';';   
        //Verificamos la conexion
        if(sql){
            sql.query(query, (err, result) => {
                if(err){
                    throw err;
                }else{     
                    let cuenta = Cuenta.mapFactory(result[0]);                                                                                          
                    console.log(cuenta);                          
                    callback(null,cuenta);
                }
            })
        }else{
            throw "Problema conectado con Mysql en consultarCuenta";
        } 
    }
    //Funcion encargada de consultar todos los clientes de la base de datos
    static consultarCuentas(callback) {
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

module.exports = Cuenta;