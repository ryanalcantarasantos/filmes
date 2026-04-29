//import das dependencias para criar a api
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// permitindo a utilização do body das requisicoes
const bodyParserJSON = bodyParser.json()

//criando um objeto do express para criar a api
const app = express()

//configuracao de cors da api
const corsOptions = {
    origin: ['*'], // configuracao de origem da requisicao (ip ou dominio)
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // configuracao dos verbos que serao utilizados na api
    allowedHeaders: ['Content-type', 'Authorization'] // configuracao de permissoes
                    //tipo de dados   //autorizacao de acesso
}

//aplica as configuracoes do cors no app (express)
app.use(cors(corsOptions))

// import das controllers do projeto
const controllerFilme = require('./controller/filme/controller_filme.js')

// endpoints
app.post('/v1/senai/locadora/filme',bodyParserJSON, async function(request, response){
    // recebendo o body da requisição
    let dados = request.body

    // recebendo o tipo de dados da requisicao para validar se é json
    let contentType = request.headers['content-type']

    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/filme', async function(request, response){

    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/:id', async function(request, response){
    // recebe o id do filme via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){
    // recebe o content type da requisicao para validar se é json
    let contentType = request.headers['content-type']

    // recebe o id do registro a ser atualizado
    let id = request.params.id

    // recebe os dados do body que serao modificados no bd
    let dados = request.body

    // chama a funcao para atualizar o filme devemos encaminhar as 3 variaveis na mesma sequencia que a funcao foi criada na controller
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})


//fazer o start na api (aguardando as requisicoes)
app.listen(8080, function(){
    console.log('api aguardando novas requisições...')
})