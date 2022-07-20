const express = require("express");
const routes = express.Router();

const ExercicioController = require("./controllers/ExercicioController");
const UsuarioController = require("./controllers/UsuarioController");
const login = require("./middleware/login");

routes
  .get("/treinos/filtro-nome/:nome", ExercicioController.show)
  .get("/treinos/filtro-id/:id", ExercicioController.index)
  .get("/treinos", ExercicioController.getTreinos)
  .get("/exercicio", ExercicioController.getExercicios)
  .post("/exercicios", ExercicioController.store)
  .post("/adicionaTreino", ExercicioController.addTreino);

routes
  .get("/usuarios", UsuarioController.index)
  .post("/usuarios", UsuarioController.store)
  .post("/login", UsuarioController.login)
  .put("/email/:id", UsuarioController.update);

module.exports = routes;
