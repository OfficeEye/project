var database = require("../database/config")

function cadastrarUsuario(nome, cpf, email, permision, senha, fkEmpresa) {
    var instrucao = `
        INSERT INTO usuario (nome, email, tipo, cpf, senha, fkEmpresa) VALUES ('${nome}', '${email}', '${permision}', ${cpf}, '${senha}', '${fkEmpresa}')
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function gestorCadastrarFuncionario(nome, email, cpf, cargo, senha, fkEmpresa) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    INSERT INTO funcionario (nome, email, area, cpf, senha, fkEmpresa) VALUES ('${nome}', '${email}', '${cargo}', ${cpf}, '${senha}', '${fkEmpresa}');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);   
}

function buscarInformacoesUsuario(idUsuario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        SELECT nome, email, cpf, senha FROM usuario WHERE idUsuario = ${idUsuario}
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao); 
}

function editarInformacoesUsuario(idUsuario, nome, email, cpf, senha) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        UPDATE usuario SET nome = '${nome}', email = '${email}', cpf = ${cpf}, senha = '${senha}' WHERE usuario.idUsuario = '${idUsuario}';
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao); 
}
module.exports = {
    cadastrarUsuario,
    gestorCadastrarFuncionario,
    buscarInformacoesUsuario,
    editarInformacoesUsuario
};