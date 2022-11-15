const fs = require('fs');

let idglobal =1;

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }

    
async save(obj) {
        let data = this.getAll();
        data.push(obj)
        fs.writeFileSync(this.fileName, JSON.stringify(data),'utf-8');
        idglobal = data[data.length -1].id +1;
    }

   /* Crear un método que recibe un id y devuelve el objeto con ese id, o null si no está. */
    getById(id) {
        let obj = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
        return obj.find(object => object.id == id);
    }    

    /*crear un método que  devuelve un array con los objetos presentes en el archivo*/
    getAll() {
        let obj = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
        return obj;

    }
    
    /*crear un método que elimina todos los objetos presentes en el archivo*/
    deleteAll() {
        fs.writeFileSync(this.fileName, '[]', 'utf-8');
    }

    /*crear un método que elimina objeto por id*/
    deleteById(id) {
        fs.readFileSync(this.fileName, 'utf8', (err, data) => {
            if (err) throw err;
            let json = JSON.parse(data);
            let newJson = json.filter(item => item.id !== id);
            fs.writeFileSync(this.fileName, JSON.stringify(nuevadata), (err) => {
                if (err) throw err;
            });
        });
    }
    
}

const archivoPrueba = new Contenedor ("./files/productos.json");

archivoPrueba.save({"nombre":"objeto","id":idglobal})
archivoPrueba.save({"nombre":"objeto2","id":idglobal})
archivoPrueba.save({"nombre":"objeto3","id":idglobal})
console.log(archivoPrueba.getById(2));
console.log(archivoPrueba.getAll());
archivoPrueba.deleteById(1);
console.log(archivoPrueba.getAll()); 
// archivoPrueba.deleteAll();
console.log(archivoPrueba.getAll());
console.log(idglobal)