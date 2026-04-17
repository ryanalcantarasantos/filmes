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
const conrollerFilme = require('./controller/filme/controller_filme.js')

// endpoints
app.post('/v1/senai/locadora/filme',bodyParserJSON, async function(request, response){
    // recebendo o body da requisição
    let dados = request.body

    let result = await controllerFilme.inserirNovoFilme(dados)

    response.status(result.status_code)
    response.json(result)

})


//fazer o start na api (aguardando as requisicoes)
app.listen(8080, function(){
    console.log('api aguardando novas requisições...')
})