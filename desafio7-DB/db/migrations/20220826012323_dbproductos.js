/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('productos', (table) => {
        table.increments('id')
        table.string('nombre')
        table.float('precio')
        table.string('thumbnail')
      })
      .then(() => {
        console.log("Tabla productos creada")
      })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
