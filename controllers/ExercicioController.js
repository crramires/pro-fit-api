const knex = require("../database/dbConfig");

module.exports = {
  //index listagem
  //store/create inclusao
  //update alteração
  //show obter 1 registro
  //destroy exclusao

  async index(req, res) {
    const { id } = req.params;
    const novo = await knex("treinos").where("id", id);
    const exercicios = await knex
      .select(
        "e.id",
        "e.exercicio",
        "t.nome as treino",
        "t.id as treinos",
        "t.dificuldade as treinos",
        "t.avaliacao as treinos",
        "e.serie",
        "e.descanso",
        "e.repeticao"
      )
      .from("exercicios as e")
      .rightJoin("treinos as t", "e.treino_id", "t.id")
      .where("treino_id", "=", novo[0].id);
    res.status(200).json(exercicios);
  },

  async store(req, res) {
    const { exercicio, treino_id, serie, descanso, repeticao } = req.body;

    if (!exercicio || !treino_id || !serie || !descanso || !repeticao) {
      res.status(400).json({ erro: "Preencha os dados corretamente." });
      return;
    }

    try {
      const novo = await knex("exercicios").insert({
        exercicio,
        treino_id,
        serie,
        descanso,
        repeticao,
      });
      res.status(201).json("Exercicio inserido com sucesso.");
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async show(req, res) {
    try {
      const { nome } = req.params;
      const novo = await knex("treinos").where("nome", "like", `%${nome}%`);
      if (!novo) {
        throw new Error("Não existe treino com esse nome.");
      }
      res.status(200).json(novo);
    } catch {
      res.send("Algo deu errado.");
    }
  },

  async idTreino(req, res) {
    try {
      const { id } = req.params;
      const novo = await knex("treinos").where("id", id);
      if (!novo) {
        throw new Error("Não existe treino com esse id.");
      }
      res.status(200).json(novo);
    } catch {
      res.send("Erro!");
    }
  },

  async getTreinos(req, res) {
    const novo = await knex("treinos");
    res.status(200).json(novo);
  },

  async getExercicios(req, res) {
    const novo = await knex("exercicios");
    res.status(200).json(novo);
  },

  async addTreino(req, res) {
    const { nome, dificuldade, avaliacao } = req.body;

    if (!nome || !dificuldade || !avaliacao) {
      res.status(400).json({ erro: "Preencha os dados corretamente." });
      return;
    }

    try {
      const novo = await knex("treinos").insert({
        nome,
        dificuldade,
        avaliacao,
      });
      res.status(201).json("Treino inserido com sucesso.");
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async addTtreino(req, res) {
    const { nome, dificuldade, avaliacao } = req.body;

    if (!nome || !dificuldade || !avaliacao) {
      res.status(400).json({ erro: "Preencha os dados corretamente." });
      return;
    }

    try {
      const novo = await knex("treinos").insert({
        nome,
        dificuldade,
        avaliacao,
      });
      res.status(201).json("Treino adicionado com sucesso.");
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },
};
