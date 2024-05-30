var database = require("../database/config")

function tecnicoCadastrarMaquina(nomeMaquina, modeloMaquina, idFuncionario, fkEmpresa) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        INSERT INTO maquina (modelo, nomeMaquina, sistemaOperacional, fabricante, fkFuncionario, fkEmpresa) VALUES ('${modeloMaquina}', '${nomeMaquina}', null, null, '${idFuncionario}', '${fkEmpresa}')
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosMaquina(fkEmpresa) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    SELECT maquina.idMaquina, funcionario.nome AS nomeFuncionario, maquina.nomeMaquina, maquina.modelo, maquina.sistemaOperacional, maquina.fabricante FROM maquina JOIN funcionario ON fkFuncionario = idFuncionario WHERE funcionario.fkEmpresa = ${fkEmpresa};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEspecificacaoDisco(fkMaquina, fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        INSERT INTO especificacaoComponente (nomeEspecificacao, informacaoTotalEspecificacao, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES ('Tamanho total', null, 1, ${fkMaquina}, ${idFuncionario}, ${fkEmpresa})
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
            
function cadastrarEspecificacaoMemoria(fkMaquina, fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    INSERT INTO especificacaoComponente (nomeEspecificacao, informacaoTotalEspecificacao, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES ('Memória total', null, 2, ${fkMaquina}, ${idFuncionario}, ${fkEmpresa})
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
            
function cadastrarEspecificacaoCPU(fkMaquina, fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    INSERT INTO especificacaoComponente (nomeEspecificacao, informacaoTotalEspecificacao, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES ('Frequência', null, 3, ${fkMaquina}, ${idFuncionario}, ${fkEmpresa})
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
            
module.exports = {
    tecnicoCadastrarMaquina,
    getDadosMaquina,
    cadastrarEspecificacaoDisco,
    cadastrarEspecificacaoMemoria,
    cadastrarEspecificacaoCPU    
}