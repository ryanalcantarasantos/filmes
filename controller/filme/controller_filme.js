/////////////////////////////////////////////////////////////////////////////
// objetivo arquivo responsavel pela validação, tratamento, manipulação de
//      dados para realizar o crud de filme
// data 17/04/26
// autor ryan
// versao 1.0
/////////////////////////////////////////////////////////////////////////////

// import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// import do arquivo do bao para manipular os dados do filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

// função para inserir um novo filme
const inserirNovoFilme = async function(filme){

    // cria uma copia dos jsons do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVALIDO'
    }else if(filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined){
        customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVALIDO'
    }else if(filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 255){
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVALIDO'
    }else if(filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVALIDO'
    }else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÂO] INVALIDO'
    }else if(filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVALIDO'
    }else if(filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÂO] INVALIDO'
    }else{
        let result = filmeDAO.insertFilme(filme)

        if(result){
            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_CREATED_ITEM.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_CREATED_ITEM.status_code
            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_CREATED_ITEM.message
        }else{
            customMessage.DEFAULT_MESSAGE.status = customMessage.ERROR_INTERNAL_SERVER_MODEL.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.ERROR_INTERNAL_SERVER_MODEL.status_code
            customMessage.DEFAULT_MESSAGE.message = customMessage.ERROR_INTERNAL_SERVER_MODEL.message
        }

        return customMessage.DEFAULT_MESSAGE
    }
}

// função para atualizar um filme existente
const atualizarFilme = async function(){

}

// função para retornar todos os filmes existentes
const listarFilme = async function(){

}

// função para retornar um filme filtrando pelo id
const buscarFilme = async function(){

}

// função para excluir um filme
const excluirFilme = async function(){

}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}