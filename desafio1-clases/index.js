//DESAFIO 1

/*Crea una clase usuario recibiendo como parametros nombre, apellido y una lista de libros y/o mascotas como opcionales*/
class Usuario {
    constructor(nombre, apellido,libros,mascotas) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = [];
      this.mascotas = [];
    }

/*Devuelve el nombre completo de un usuario*/
    getFullName() {
        return `El nombre completo es ${this.nombre} ${this.apellido}`;
      }
    
/*Añade el nombre de una mascota a la lista de mascotas recibiendo el nombre como parametro*/
    addMascota(mascota) {
      this.mascotas.push(mascota);
    }
  
/*Cuenta la cantidad de mascotas en la lista de mascotas*/
    countMascotas() {
      return this.mascotas.length;
    }
  
/*Añade un libro a la lista de libros recibiendo como parametros el título y su autor */
    addBook(titulo, autor) {
      this.titulo = titulo;
      this.autor = autor;
      this.libros.push({ titulo, autor });
    }

/*Devuelve el nombre de las mascotas de la lista de mascotas*/
    getMascotas() {
        return this.mascotas;
    }

/*Devuelve el titulo de cada uno de los libros de la lista de libros*/
    getBooksNames() {
      const soloTitulos = this.libros.map(titulo => titulo.titulo);
      return soloTitulos;
  }

}

/* Crear una instancia de la clase Usuario llamada user y ejecuta los métodos de la clase con datos de prueba*/
  
const user = new Usuario("Juan", "Carvajal");
user.addMascota("Nicolas");
user.addMascota("Bono");
user.addMascota("Pirulina");
user.addBook("Señor de los Anillos", "J.R.R. Tolkien");
user.addBook("Harry Potter", "J.K Rowlin");
user.addBook("El Silmarillion", "J.R.R. Tolkien");
user.addBook("100 años de soledad", "Gabriel Garcia Marquez");
console.log(user.countMascotas());
console.log(user.getFullName());
console.log(user.getBooksNames());
console.log(user.getMascotas());