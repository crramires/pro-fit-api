
exports.up = (knex) => {
  return knex.schema.createTable('exercicios', (table) => {
    table.increments();
    table.string('nome', 60).notNullable();
    table.string('serie', 4).notNullable();
    table.string('descanso', 4).notNullable();
    table.integer('gostei').notNullable();
    table.integer('naoGostei').notNullable();
    table.integer('adorei').notNullable();
    table.integer("treino_id").notNullable().unsigned();
    table.foreign('treino_id')
         .references("treinos.id")
         .onDelete("restrict")
         .onUpdate("cascade")
    
    table.timestamps(true, true);
    
     
  })
};


exports.down = (knex) => {
  return knex.schema.dropTable('exercicios');
};
