/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('exercicios').del()
  await knex('exercicios').insert([
    {nome: 'Supino Reto', treino_id: 1, serie: '3x10', descanso: '60s', gostei: 0, naoGostei: 0, adorei: 0},
    {nome: 'Rosca direta', treino_id: 1, serie: '3x10', descanso: '60s', gostei: 0, naoGostei: 0, adorei: 0},
    {nome: 'Puxada de Frente', treino_id: 2, serie: '3x10', descanso: '60s', gostei: 0, naoGostei: 0, adorei: 0},
    {nome: 'Triceps Corda', treino_id: 2, serie: '3x10', descanso: '60s', gostei: 0, naoGostei: 0, adorei: 0},
    {nome: 'Agachamento', treino_id: 3, serie: '3x10', descanso: '60s', gostei: 0, naoGostei: 0, adorei: 0}
    
  ]);
};
