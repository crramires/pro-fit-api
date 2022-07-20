
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('treinos').del()
  await knex('treinos').insert([
    {nome: 'Treino de peito, ombro e triceps'},
    {nome: 'Treino de costas e biceps'},
    {nome: 'Treino de inferiores'}
  ]);
};
