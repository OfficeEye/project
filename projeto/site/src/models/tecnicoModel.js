var database = require("../database/config")

function tecnicoCadastrarMaquina(fkMaquina, nomeMaquina, modeloMaquina, idFuncionario, fkEmpresa) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        INSERT INTO maquina (idMaquina, modelo, nomeMaquina, sistemaOperacional, fabricante, fkFuncionario, fkEmpresa) VALUES (${fkMaquina}, '${modeloMaquina}', '${nomeMaquina}', null, null, '${idFuncionario}', '${fkEmpresa}')
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
        INSERT INTO especificacaoComponente (nomeEspecificacao, informacaoTotalEspecificacao, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES ('Tamanho total', null, 1, ${fkMaquina}, ${idFuncionario}, ${fkEmpresa});
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
            
function cadastrarEspecificacaoMemoria(fkMaquina, fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    INSERT INTO especificacaoComponente (nomeEspecificacao, informacaoTotalEspecificacao, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES ('Memória total', null, 2, ${fkMaquina}, ${idFuncionario}, ${fkEmpresa});
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
            
function cadastrarEspecificacaoCPU(fkMaquina, fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    INSERT INTO especificacaoComponente (nomeEspecificacao, informacaoTotalEspecificacao, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES ('Frequência', null, 3, ${fkMaquina}, ${idFuncionario}, ${fkEmpresa});
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getUltimoIDFuncionario(fkEmpresa) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    SELECT idFuncionario FROM funcionario WHERE fkEmpresa = ${fkEmpresa} ORDER BY idFuncionario DESC LIMIT 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function getUltimoIDFuncionario(fkEmpresa) {
//     console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
//     var instrucao = `
//     SELECT TOP 1 idFuncionario FROM funcionario WHERE fkEmpresa = ${fkEmpresa} ORDER BY idFuncionario DESC;
//     `
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function getUltimoStatusRegistroEspacoDisponivel(fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
/*    var instrucao = `
    SELECT funcionario.idFuncionario, funcionario.nome, maquina.nomeMaquina, componente.nomeComponente, registrosEspecificacaoComponente.tipoRegistro, registrosEspecificacaoComponente.registroNumero, registrosEspecificacaoComponente.statusRegistro, registrosEspecificacaoComponente.dataHoraRegistro
	FROM registrosEspecificacaoComponente 
		JOIN especificacaoComponente ON registrosEspecificacaoComponente.fkEspecificacaoComponente = idEspecificacaoComponentes
        JOIN componente ON especificacaoComponente.fkComponente = idComponente
		JOIN maquina ON especificacaoComponente.fkMaquina = idMaquina
        JOIN funcionario ON maquina.fkFuncionario = idFuncionario
			WHERE registrosEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND funcionario.idFuncionario = ${idFuncionario} AND tipoRegistro = 'Espaço disponível'
        ORDER BY registrosEspecificacaoComponente.dataHoraRegistro DESC
        LIMIT 1;
    `
    */
    var instrucao = `
    SELECT funcionario.idFuncionario, funcionario.nome, maquina.nomeMaquina, componente.nomeComponente, registrosEspecificacaoComponente.tipoRegistro, registrosEspecificacaoComponente.registroNumero, registrosEspecificacaoComponente.statusRegistro, registrosEspecificacaoComponente.dataHoraRegistro
	FROM registrosEspecificacaoComponente 
		JOIN especificacaoComponente ON registrosEspecificacaoComponente.fkEspecificacaoComponente = idEspecificacaoComponentes
        JOIN componente ON especificacaoComponente.fkComponente = idComponente
		JOIN maquina ON especificacaoComponente.fkMaquina = idMaquina
        JOIN funcionario ON maquina.fkFuncionario = idFuncionario
			WHERE registrosEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND funcionario.idFuncionario = ${idFuncionario}  
        ORDER BY registrosEspecificacaoComponente.dataHoraRegistro DESC
        LIMIT 5;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function getUltimoStatusRegistroEspaçoDisponivel(fkEmpresa, idFuncionario) {
//     console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
//     var instrucao = `
//     SELECT TOP 1 funcionario.idFuncionario, funcionario.nome, maquina.nomeMaquina, componente.nomeComponente, registrosEspecificacaoComponente.tipoRegistro, registrosEspecificacaoComponente.registroNumero, registrosEspecificacaoComponente.statusRegistro, registrosEspecificacaoComponente.dataHoraRegistro
// 	FROM registrosEspecificacaoComponente 
// 		JOIN especificacaoComponente ON registrosEspecificacaoComponente.fkEspecificacaoComponente = idEspecificacaoComponentes
//         JOIN componente ON especificacaoComponente.fkComponente = idComponente
// 		JOIN maquina ON especificacaoComponente.fkMaquina = idMaquina
//         JOIN funcionario ON maquina.fkFuncionario = idFuncionario
// 			WHERE registrosEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND funcionario.idFuncionario = ${idFuncionario} AND tipoRegistro = 'Espaço disponível'
//         ORDER BY registrosEspecificacaoComponente.dataHoraRegistro DESC;
//     `
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function getUltimoStatusRegistroMemoriaUso(fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    SELECT funcionario.idFuncionario, funcionario.nome, maquina.nomeMaquina, componente.nomeComponente, registrosEspecificacaoComponente.tipoRegistro, registrosEspecificacaoComponente.registroNumero, registrosEspecificacaoComponente.statusRegistro, registrosEspecificacaoComponente.dataHoraRegistro
	FROM registrosEspecificacaoComponente 
		JOIN especificacaoComponente ON registrosEspecificacaoComponente.fkEspecificacaoComponente = idEspecificacaoComponentes
        JOIN componente ON especificacaoComponente.fkComponente = idComponente
		JOIN maquina ON especificacaoComponente.fkMaquina = idMaquina
        JOIN funcionario ON maquina.fkFuncionario = idFuncionario
			WHERE registrosEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND funcionario.idFuncionario = ${idFuncionario} AND tipoRegistro = 'Memória em uso'
        ORDER BY registrosEspecificacaoComponente.dataHoraRegistro DESC
        LIMIT 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function getUltimoStatusRegistroEspaçoDisponivel(fkEmpresa, idFuncionario) {
//     console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
//     var instrucao = `
//     SELECT TOP 1 funcionario.idFuncionario, funcionario.nome, maquina.nomeMaquina, componente.nomeComponente, registrosEspecificacaoComponente.tipoRegistro, registrosEspecificacaoComponente.registroNumero, registrosEspecificacaoComponente.statusRegistro, registrosEspecificacaoComponente.dataHoraRegistro
// 	FROM registrosEspecificacaoComponente 
// 		JOIN especificacaoComponente ON registrosEspecificacaoComponente.fkEspecificacaoComponente = idEspecificacaoComponentes
//         JOIN componente ON especificacaoComponente.fkComponente = idComponente
// 		JOIN maquina ON especificacaoComponente.fkMaquina = idMaquina
//         JOIN funcionario ON maquina.fkFuncionario = idFuncionario
// 			WHERE registrosEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND funcionario.idFuncionario = ${idFuncionario} AND tipoRegistro = 'Memória em uso'
//         ORDER BY registrosEspecificacaoComponente.dataHoraRegistro DESC;
//     `
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function getMaquinaAlerta(fkEmpresa) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    SELECT funcionario.idFuncionario, funcionario.nome, maquina.nomeMaquina, componente.nomeComponente, registrosEspecificacaoComponente.tipoRegistro, registrosEspecificacaoComponente.registroNumero, registrosEspecificacaoComponente.statusRegistro, registrosEspecificacaoComponente.dataHoraRegistro
	FROM registrosEspecificacaoComponente 
		JOIN especificacaoComponente ON registrosEspecificacaoComponente.fkEspecificacaoComponente = idEspecificacaoComponentes
        JOIN componente ON especificacaoComponente.fkComponente = idComponente
		JOIN maquina ON especificacaoComponente.fkMaquina = idMaquina
        JOIN funcionario ON maquina.fkFuncionario = idFuncionario
			WHERE registrosEspecificacaoComponente.fkEmpresa = 1 
        ORDER BY registrosEspecificacaoComponente.dataHoraRegistro DESC;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
            
module.exports = {
    tecnicoCadastrarMaquina,
    getDadosMaquina,
    cadastrarEspecificacaoDisco,
    cadastrarEspecificacaoMemoria,
    cadastrarEspecificacaoCPU,
    getUltimoIDFuncionario,
    getUltimoStatusRegistroEspacoDisponivel,
    getUltimoStatusRegistroMemoriaUso,
    getMaquinaAlerta
}