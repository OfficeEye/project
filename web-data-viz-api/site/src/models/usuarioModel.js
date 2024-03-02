var database = require("../database/config")

function logar() {
    console.log("Script do banco de dados para fazer login - Clonar data viz separadamente e consultar chamado Autenticar")
}


function cadastrar() {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
}

module.exports = {
    logar,
    cadastrar
};