/////////////////////////////////////////////////////////////////////////////
// objetivo arquivo responsavel pelo crud de dados do filme no banco de dados
//          mysql
// data 15/04/26
// autor ryan
// versao 1.0
/////////////////////////////////////////////////////////////////////////////

// import da biblioteca pra manipular dados no banco de dados mysql
const knex = require('knex')

// import do arquivo de configuracao para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// criar a conexao com banco de dados mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

// função para inserir um novo filme no banco de dados
const insertFilme = async function(filme){
    let sql = `insert into tbl_filme (
	    nome,
        sinopse,
        capa,
        data_lancamento,
        duracao,
        valor,
        avaliacao
    ) values (
	    '${filme.nome}',
        '${filme.sinopse}',
        '${filme.capa}',
        '${filme.data_lancamento}',
        '${filme.duracao}',
        '${filme.valor}',
        '${filme.avaliacao}'
    );`

    // encaminha para o banco de dados o script sql
    let result = await knexConection.raw(sql)

    if(result)
        return true
    else
        return false

}

// função para atualizar um filme existente no banco de dados
const updateFilme = async function(filme){

}

// função para retornar todos os dados de filme do banco de dados
const selectAllFilme = async function(){

}

// função para retornar um filme filtrando pelo id
const selectByIdFilme = async function(id){

}

// função para excluir um filme filtrando pelo id
const deleteFilme = async function(id){

}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}