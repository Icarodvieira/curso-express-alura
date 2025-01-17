import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar);
routes.get("/livros/busca", LivroController.buscaLivroPorFiltro, paginar);
routes.get("/livros/:id", LivroController.buscarLivroPorID);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizaLivro);
routes.delete("/livros/:id", LivroController.deletaLivro);

export default routes;