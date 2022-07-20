exports.up = (knex) => {
  return knex.schema.createTable("treinos", (table) => {
    table.increments();
    table.string("nome", 60).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("treinos");
};
