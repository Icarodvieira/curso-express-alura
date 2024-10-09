import Erro404 from "../erros/erro404.js";
import { autor } from "../models/index.js";

class AutorController {

  static async listarAutores (req, res, next){
    try {
      const listaAutores = autor.find({});
      req.resultado = listaAutores;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static async cadastrarAutor(req, res, next){
    try{
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Autor criado com sucesso.", autor: novoAutor });
    }catch(erro){
      next(erro);
    }
  }

  static async buscarAutorPorID(req,res, next){
    try{
      const id = req.params.id;
      const AutorEncontrado = await autor.findById(id);
      if(AutorEncontrado){
        res.status(200).json(AutorEncontrado);
      }else{
        next(new Erro404("Id do Autor não encontrado."));
      }
    }catch (erro){
      next(erro);
    }
  }

  static async atualizaAutor (req,res,next){
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);
      if(autorEncontrado){
        res.status(200).json({ message: "Autor atualizado com sucesso." });
      }else{
        next(new Erro404("Não foi possível atualizar. Id do Autor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }  
  }

  static async deletaAutor(req,res,next){
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndDelete(id);
      if(autorEncontrado){
        res.status(200).send({ message: "Autor excluído com sucesso." });
      }else{
        next(new Erro404("Não foi possível excluir. Id do Autor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
};

export default AutorController;
