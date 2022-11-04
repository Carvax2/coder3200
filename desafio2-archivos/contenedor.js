const fs = require('fs');

//Variable contador de los productos creados
let idglobalcreados;

//Variable que almacena el ID del último producto borrado
let ultimoborrado;


class Contenedor {
        constructor(fileName) {
            this.fileName = fileName;
    }


    //Guarda un nuevo objeto en el archivo con un ID único. 
    save(obj) {
        let data = this.getAll();
            //verifica si ya hay productos existentes para tomar el id
            if (data.length > 0) {
                // toma el id del último producto creado y lo asigna como el proximo id sumando 1
                let proximoid = data[data.length -1].id + 1;
                //verifica si el proximo id no corresponde al id del ultimo archivo borrado
                if (proximoid != ultimoborrado) {
                    obj.id = proximoid;
                }
                //en caso de que el proximo id sea el del ultimo id borrado le suma 1 al proximo id
                else {
                    obj.id = proximoid + 1;
                }  
            data.push(obj);
                
            }
            //si no hay productos existentes crea el primero con id 1
            else {
                obj.id = 1
                data = [(obj)]
            }                   
        fs.writeFileSync(this.fileName, JSON.stringify(data),'utf-8');
         //incrementa el contador de id de productos creados
        idglobalcreados++;
    }

   /* Crear un método que recibe un id y devuelve el objeto con ese id*/
    getById(id) {
        let obj = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
        return obj.find(object => object.id == id);
    }    

    /*crear un método que  devuelve un array con los objetos presentes en el archivo*/
    getAll() {
        let obj = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
        return obj;
    }
    
    /*crear un método que elimina todos los objetos presentes en el archivo*/
    deleteAll() {
        let data = this.getAll();
        fs.writeFileSync(this.fileName, '[]', 'utf-8');
    }

    /*crear un método que elimina objeto por id*/
    deleteById(id){
        let json = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
        let nuevadata = json.filter(item => item.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(nuevadata));
        ultimoborrado = id;
    }
    
}

//PRUEBAS

const archivoPrueba = new Contenedor ("./files/productos.json");
archivoPrueba.save({"nombre":"objeto1"})
archivoPrueba.save({"nombre":"objeto2"})
archivoPrueba.save({"nombre":"objeto3"})
console.log(archivoPrueba.getAll()); 
archivoPrueba.deleteById(2);
console.log(archivoPrueba.getById(1));
archivoPrueba.save({"nombre":"objeto4"})
console.log(archivoPrueba.getAll()); 
archivoPrueba.save({"nombre":"objeto5"})
console.log(archivoPrueba.getAll());
archivoPrueba.deleteById(4);
archivoPrueba.save({"nombre":"objeto6"})
console.log(archivoPrueba.getAll());