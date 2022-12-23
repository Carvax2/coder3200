/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('mensajes', (table) => {
        table.increments('id')
        table.string('usuario')
        table.dateTime('fecha')
        table.string('mensaje')
      })
      .then(() => {
        console.log("Tabla mensajes creada")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
