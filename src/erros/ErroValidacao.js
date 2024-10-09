/* eslint-disable linebreak-style */
import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta{
  constructor(erro){
    const mensagensErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");
    super(`Os Seguintes erros foram encontrados: ${mensagensErro}`);
  }
}

export default ErroValidacao;