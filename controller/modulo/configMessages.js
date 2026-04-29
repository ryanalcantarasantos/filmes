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
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'não foi possivel processar a requisição devido a um erro interno no servidor [CONTROLLER]'}
const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'não foi possivel processar a requisição, pois o formato de dados não é suportado pelo servidor, apenas deve ser utilizado JSON'}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'não foram encontrados dados para retorno'}

// mensagens de sucesso do projeto de filmes
const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'item inserido com sucesso'}
const SUCCES_RESPONSE = {status: true, status_code: 200}
const SUCCESS_UPDATED_ITEM = {status: true, status_code: 200, message: 'item atualizado com sucesso'}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCESS_CREATED_ITEM,
    SUCCES_RESPONSE,
    SUCCESS_UPDATED_ITEM
}