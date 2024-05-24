var database = require("../database/config")

function logar(email, senha) {
    console.log("Script do banco de dados para fazer login - Clonar data viz separadamente e consultar chamado Autenticar")
    var instrucao = `
        SELECT nome, email, tipo, senha, fkEmpresa FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarEmpresa(nomeFantasia, razaoSocial, cnpj) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        INSERT INTO empresa (nomeFantasia, razaoSocial, cnpj) VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}');
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUsuario(nome, cpf, email, senha, fkEmpresa) {
    var instrucao = `
        INSERT INTO usuario (nome, email, tipo, cpf, senha, fkEmpresa) VALUES ('${nome}', '${email}', 'gerente', ${cpf}, '${senha}', '${fkEmpresa}')
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

                                                            

function existeEmpresa(nomeFantasia, razaoSocial, cnpj) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        SELECT nomeFantasia, razaoSocial, cnpj FROM empresa WHERE nomeFantasia = "${nomeFantasia}" AND razaoSocial = "${razaoSocial}" AND cnpj = ${cnpj};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function ultimaEmpresaCadastrada() {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        SELECT idEmpresa FROM empresa ORDER BY idEmpresa DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    logar,
    cadastrarEmpresa,
    existeEmpresa,
    ultimaEmpresaCadastrada,
    cadastrarUsuario
};