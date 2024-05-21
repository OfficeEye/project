var database = require("../database/config")

function logar(email, senha) {
    console.log("Script do banco de dados para fazer login - Clonar data viz separadamente e consultar chamado Autenticar")
    var instrucao = `
        SELECT idEmpresa, nomeFantasia, email, senha FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrar(nomeFantasia, razaoSocial, cnpj, nome, cpf, email, senha) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        INSERT INTO empresa (nomeFantasia, razaoSocial, cnpj, email, senha) VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    logar,
    cadastrar
};