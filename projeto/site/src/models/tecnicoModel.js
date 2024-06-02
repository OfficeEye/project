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


function buscarChamadosPendentes(fkEmpresa) {
    console.log("Script do banco de dados para buscar todos os chamados pendentes em uma determinada empresa")
    var instrucao = `
   
 SELECT idChamado, FORMAT(dataAbertura, 'dd/MM HH:mm') AS data, status, prioridade, fkUsuario, fkFuncionario, c.fkEmpresa, mensagem, email FROM chamado c join funcionario f ON c.fkFuncionario = f.idFuncionario WHERE status =  'PENDENTE_APROVACAO' AND c.fkEmpresa  = ${fkEmpresa};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function validarChamado(nivelPrioridade, idChamado, fkUsuario) {
    console.log("Script do banco de dados que atualiza os dados do chamado quando o técnico valida ele")
    var instrucao = `
   
    UPDATE chamado 
    SET status = 'EM_ANDAMENTO', prioridade = '${nivelPrioridade}', fkUsuario = ${fkUsuario} 
    WHERE idChamado = ${idChamado}
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function removerChamado(idChamado, fkUsuario) {
    console.log("Script do banco de dados que atualiza o status de um chamado para removido")
    var instrucao = `
   
    UPDATE chamado 
    SET status = 'REMOVIDO', fkUsuario = ${fkUsuario} 
    WHERE idChamado = ${idChamado}
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
            
module.exports = {
    tecnicoCadastrarMaquina,
    getDadosMaquina,
    cadastrarEspecificacaoDisco,
    cadastrarEspecificacaoMemoria,
    cadastrarEspecificacaoCPU ,
    buscarChamadosPendentes,
    validarChamado,
    removerChamado   
}