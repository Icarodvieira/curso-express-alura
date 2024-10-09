import { autor, livro } from "../models/index.js";
import Erro404 from "../erros/erro404.js";

class LivroController {

  static async listarLivros (req, res, next){
    try {
      const buscaLivros = livro.find();

      req.resultado = buscaLivros;
      
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static async cadastrarLivro(req,res,next){
    const novoLivro = req.body;
    try{
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = {...novoLivro, autor: {...autorEncontrado._doc}};
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "livro criado com sucesso.", livro: livroCriado });
    }catch(erro){
      next(erro);
    }
  }

  static async buscarLivroPorID(req,res,next){
    try{
      const id = req.params.id;
      const LivroEncontrado = await livro.findById(id);
      if(LivroEncontrado){
        res.status(200).json(LivroEncontrado);
      }else{
        next(new Erro404("Id do Livro não encontrado."));
      }
    }catch (erro){
      next(erro);
    }
  }

  static async atualizaLivro (req,res,next){
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);
      if(livroEncontrado){
        res.status(200).json({ message: "Livro atualizado com sucesso." });
      }else{
        next(new Erro404("Não foi possível atualizar. Id do Livro não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }  
  }

  static async deletaLivro(req,res,next){
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndDelete(id);
      if(livroEncontrado){
        res.status(200).send({ message: "livro deletado com sucesso." });
      }else{
        next(new Erro404("Não foi possível excluir. Id do Livro não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async buscaLivroPorFiltro(req,res,next) {
    try {
      const busca = await processaFiltro(req.query);
      console.log(busca);
      
      if(busca){
        
        const livrosPorFiltro = livro.find(busca);
        req.resultado = livrosPorFiltro;

        next();
      }else{
        res.status(200).send([]);
      }
    }catch (erro) {
      next(erro);
    }
  }
};

async function processaFiltro(query){
  const { editora, titulo, minPag, maxPag, nomeAutor } = query;
  let busca = {};
  
  if(editora) busca.editora = editora;
  // const regex = new RegExp (titulo, "i"); nativo do JS
  if(titulo) busca.titulo = { $regex: titulo, $options: "i"};
  if(minPag || maxPag) busca.paginas = {};
  if(minPag) busca.paginas = { $gte: minPag };
  if(maxPag) busca.paginas = { $lte: maxPag };
  if(nomeAutor) {
    busca = { ...busca, "autor.nome": nomeAutor };
  }
  return busca;
}

export default LivroController;
