class Contenedor {
    constructor(knexConfig, table) {
        this.knex = require('knex')(knexConfig)
        this.table= table
    }
    // Guarda un objeto en la base de datos
    save(obj) {
        return this.knex(this.table).insert(obj)
    }

    // Obtiene un objeto de la base de datos
    getbyId(id) {
        return this.knex(this.table).where('id', id).first()
    }
    // Obtiene todos los objetos de la base de datos
    getAll() {
        return this.knex(this.table)
    }
    // Actualiza un objeto en la base de datos
    update(id, obj) {
        return this.knex(this.table).where('id', id).update(obj)
    }
    // Elimina un objeto de la base de datos
    deletebyId(id) {
        return this.knex(this.table).where('id', id).del()
    }
}
module.exports = Contenedor

