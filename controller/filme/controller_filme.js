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
const inserirNovoFilme = async function(filme, contentType){

    // cria uma copia dos jsons do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
    

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            // chama a funcao para validar a entrada de dados do filme
            let validar = await validarDados(filme)

            // retorna json de erro caso algum atributo seja invalido,
            // se nao retornara um false que significa nao teve erro
            if(validar){
                return validar // 400
            }else{
                // encaminha os dados do filme para o dao inserir no banco de dados
                let result = await filmeDAO.insertFilme(filme)

                if(result){ // 201
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_CREATED_ITEM.message

                    return customMessage.DEFAULT_MESSAGE // 201
                }else{ // erro 500 model
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 model
                }
            }    
                
        }else{
            return customMessage.ERROR_CONTENT_TYPE // 415
        }
    
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 controller
    }
    
    
}




// função para atualizar um filme existente
const atualizarFilme = async function(filme, id, contentType){

    // cria uma copia dos jsons do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        // validacao para verificar se o conteudo do body é um json
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            // chama a funcao buscar filme para validar se o id esta correto,
            // se o id existe no bd e se o filme existe
            let resultBuscarFilme = await buscarFilme(id)

            if(resultBuscarFilme.status){
                // chama a funcao para validar os dados para alteracao do filme body
                let validar = await validarDados(filme)

                if(!validar){

                    // adiciona um atributo id no json de filme para enviar ao dao um unico objeto
                    filme.id = Number(id)

                    // chama a funcao para atualizar o filme no bd
                    let result = await filmeDAO.updateFilme(filme)
                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message

                        return customMessage.DEFAULT_MESSAGE // 200 atualizado
                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 model
                    }
                }else{
                    return validar // 400 de validacao dos campos do banco de dados
                }

            }else{
                return resultBuscarFilme // 400 id invalido ou 404 nao encontrado ou 500
            }
        }else{
            return customMessage.ERROR_CONTENT_TYPE // 415
        }
        
    } catch (error) {
       return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 controller 
    }

}

// função para retornar todos os filmes existentes
const listarFilme = async function(){
    // cria uma copia dos jsons do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        // chama a funcao do dao pra retornar a lista de filmes do bd
        let result = await filmeDAO.selectAllFilme()

        // validacao para verificar se o dao conseguiu processar o script no bd
        if(result){
            // validacao para verificar se o conteudo do array tem dados de retorno
            // ou se esta vazio
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE // 200
            }else{
                return customMessage.ERROR_NOT_FOUND // 404
            }
        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 controller
    }
}

// função para retornar um filme filtrando pelo id
const buscarFilme = async function(id){
    // cria uma copia dos jsons do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        // validacao para garantir que o id seja um numero valido
        if(id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        }else{
            // chama a funcao dao para pesquisar o filme pelo id
            let result = await filmeDAO.selectByIdFilme(id)
            // validacao para verificar se o dao retornou os dados ou um false
            if(result){
                // validacao para verificar se o dao tem algum dado no array
                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE // 200
                }else{
                    return customMessage.ERROR_NOT_FOUND // 404
                }
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 model
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 controller
    }
}

// função para excluir um filme
const excluirFilme = async function(){

}

// função para validar os dados do cadastro do filme
const validarDados = async function(filme){

    // cria uma copia dos jsons do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    if(filme.nome == undefined || filme.nome == '' || filme.nome == null ||  filme.nome.length > 80){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.sinopse == undefined || filme.sinopse == '' || filme.sinopse == null){
        customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.capa == undefined || filme.capa == '' || filme.capa == null || filme.capa.length > 255){
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.data_lancamento == undefined || filme.data_lancamento == '' || filme.data_lancamento == null ||  filme.data_lancamento.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.duracao == undefined || filme.duracao == '' || filme.duracao == null ||  filme.duracao.length < 5){
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÂO] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÂO] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }    
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}