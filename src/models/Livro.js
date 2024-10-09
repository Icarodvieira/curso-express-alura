import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { 
    type: String, 
    required: [true, "O titulo do livro é obrigatório."],
    validate: {
      validator: (titulo) =>{
        return titulo.length >= 3 && titulo.length <= 50;
      },
      message: "O titulo do livro deve ter no mínimo 3 letras e no máximo 50."
    }
  },
  editora: { 
    type: String, 
    required: [true, "A Editora do livro é obrigatória."],
    enum:  {values: ["Coragem", "Casa do Código", "Alura"], message: "A editora {VALUE} não é um valor permitido "}
  },
  preco: { 
    type: Number,
    validate:{ //Usando validação manual (podia ter usado min e max)
      validator: (valor) => {
        return valor >=5 && valor <= 1000;
      }, 
      message: "O preço deve ser entre 5 e 1000"
    }
  },
  paginas: { 
    type: Number, 
    min: [10, "O número de páginas deve estar entre 10 e 5000"], 
    max: [5000, "O número de páginas deve estar entre 10 e 5000"] 
  },
  autor: autorSchema
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;