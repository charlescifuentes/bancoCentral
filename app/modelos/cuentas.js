const db = require('../../bd/bd');//Importamos conexion a la base de datos
const sql = db.connection;//Instanciamos conexion para usar con las consultas

//Creamos un objeto de la tabla para proteger y enmascarar los nombres de la base de datos
const tableCuentas = {
  cuentas : "cuentas",    
  fields  : {
      id          :   "id_cuenta",
      cl_id       :   "id_cliente",
      tipo        :   "tipo_cuenta",
      saldo       :   "saldo_cuenta",
      sobregiro   :   "saldo_sobregiro"
  }
}
const tableClientes = {
  clientes    : "clientes",    
  fields  : {
      c_id         :   "id_cliente",
      nombres      :   "nombre_cliente",
      documento    :   "documento_cliente",
      profesion    :   "profesion_cliente"
  }
}
//Creamos la clase Cuenta para empezar a crear las respectivas funcionalidades.
class Cuenta {
    //Pasamos las variables globales por referencia
    constructor(id,cl_id,tipo,saldo,sobregiro,c_id) {
        if (id) {
            this.id     = id;    
        } 
        this.cl_id  = cl_id;       
        this.tipo    = tipo;
        this.saldo  = saldo;
        this.sobregiro  = sobregiro;
        this.c_id = c_id;
    }
    //Funcion encargada de Mapear los campos de la base de datos en el orden que estan segun la super clase, con el fin de enmascarar los campos de la base de datos
    static mapFactory(entity){
        let mp = {};
        if(entity){
            mp = new Cuenta(
                entity.id_cuenta,
                entity.id_cliente,
                entity.tipo_cuenta,
                entity.saldo_cuenta,
                entity.saldo_sobregiro,
            );
        }        
        return mp;
    }
    //Funcion que consulta una cuenta segun el id del cliente
    static consultarCuenta(id, callback) {
        //Armamos la consulta segn los parametros que necesitemos
        let query = 'SELECT * ';
        query += 'FROM '+tableCuentas.cuentas+' ';
        query += 'JOIN '+tableClientes.clientes+' ';
        query += 'ON '+tableClientes.clientes+'.'+tableClientes.fields.c_id+' = '+tableCuentas.cuentas+'.'+tableCuentas.fields.cl_id+' ';
        query += 'WHERE '+tableCuentas.cuentas+'.'+tableCuentas.fields.cl_id+' = '+id+';';
        
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