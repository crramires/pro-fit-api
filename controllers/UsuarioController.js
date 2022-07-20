const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const knex = require("../database/dbConfig");

module.exports = {
  async index(req, res) {
    const usuarios = await knex("usuarios");
    res.status(200).json(usuarios);
  },

  async store(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      res.status(400).json({ erro: "Preencha os dados corretamente." });
      return;
    }

    try {
      const dados = await knex("usuarios").where({ email });
      if (dados.length) {
        res.status(400).json({ erro: "E-mail já cadastrado." });
        return;
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    const hash = bcrypt.hashSync(senha, 10);

    try {
      const novo = await knex("usuarios").insert({ nome, email, senha: hash });
      res.status(201).json("Cadastro criado com sucesso.");
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { email } = req.body;

    const novo = await knex("usuarios").where("id", id).select("email");
    console.log(novo);

    if (!novo.email) {
      try {
        await knex("usuarios").where("id", id).update({ email: email });
        res.send("Email alterado com sucesso.");
      } catch (error) {
        res.status(400).json({ erro: error.message });
      }
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      res.status(400).json({ erro: "login ou senha incorretos." });
      return;
    }

    try {
      const dados = await knex("usuarios").where({ email });
      if (dados.length == 0) {
        res.status(400).json({ erro: "login ou senha incorretos." });
        return;
      }

      if (bcrypt.compareSync(senha, dados[0].senha)) {
        const token = jwt.sign(
          {
            usuario_id: dados[0].id,
            usuario_nome: dados[0].nome,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );

        res.status(200).json({ token });
      } else {
        res.status(400).json({ erro: "login ou senha incorretos." });
      }
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },
};
