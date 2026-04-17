//////////////////////////////////////////////////////////////////////////////////
// objetivo arquivo responsavel pela padronizacao das mensagens e status code
//      do projeto de filmes
// data 17/04/26
// autor ryan
// versao 1.0
//////////////////////////////////////////////////////////////////////////////////

// padronização dos retornos da api (cabeçalho)
const DEFAULT_MESSAGE = {
    api_description: 'api para controlar o projeto de filmes',
    development: 'ryan alcantara dos santos',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}

// mensagens de erro do projeto de filmes
const ERROR_BAD_REQUEST = {status: false, status_code: 400, message: 'Não foi possivel processar a requisição devido ao erro da entrada de dados.'}
const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'não foi possivel processar a requisição devido a um erro interno no servidor [MODEL]'}

// mensagens de sucesso do projeto de filmes
const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'item inserido com sucesso'}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    ERROR_INTERNAL_SERVER_MODEL,
    SUCESS_CREATED_ITEM
}