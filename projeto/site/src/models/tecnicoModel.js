
var database = require("../database/config")

function tecnicoCadastrarMaquina(fkMaquina, nomeMaquina, modeloMaquina, idFuncionario, fkEmpresa) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        INSERT INTO maquina (idMaquina, modelo, nomeMaquina, sistemaOperacional, fabricanteSO, fkFuncionario, fkEmpresa) VALUES (${fkMaquina}, '${modeloMaquina}', '${nomeMaquina}', null, null, '${idFuncionario}', '${fkEmpresa}')
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMetricaMaquinaEspaçoDisponivel(fkEmpresa, fkFuncionario, fkMaquina, fkEspecificacaoTamanhoTotalDisco, fkComponenteDisco) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        INSERT INTO metricaComponente (porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (20.00, 19.00, 9.00, ${fkEspecificacaoTamanhoTotalDisco}, ${fkComponenteDisco}, ${fkMaquina}, '${fkFuncionario}', '${fkEmpresa}', 'Espaço disponível no disco');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMetricaMaquinaMemoriaUso(fkEmpresa, fkFuncionario, fkMaquina, fkEspecificacaoMemoriaTotalRam, fkComponenteMemoria) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        INSERT INTO metricaComponente (porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (70.00, 71.00, 81.00, ${fkEspecificacaoMemoriaTotalRam}, ${fkComponenteMemoria}, ${fkMaquina}, '${fkFuncionario}', '${fkEmpresa}', 'Memória em uso');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMetricaMaquinaUsoProcessador(fkEmpresa, fkFuncionario, fkMaquina, fkEspecificacaoFrequenciaCpu, fkComponenteCpu) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        INSERT INTO metricaComponente (porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (30.00, 71.00, 90.00, ${fkEspecificacaoFrequenciaCpu}, ${fkComponenteCpu}, ${fkMaquina}, '${fkFuncionario}', '${fkEmpresa}', 'Uso do processador');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMetricaMaquinaTemperaturaCpu(fkEmpresa, fkFuncionario, fkMaquina, fkEspecificacaoFrequenciaCpu, fkComponenteCpu) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        INSERT INTO metricaComponente (porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (79.00, 80.00, 90.00, ${fkEspecificacaoFrequenciaCpu}, ${fkComponenteCpu}, ${fkMaquina}, '${fkFuncionario}', '${fkEmpresa}', 'Temperatura da CPU');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosMaquina(fkEmpresa) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    SELECT maquina.idMaquina, funcionario.nome AS nomeFuncionario, maquina.nomeMaquina, maquina.modelo, maquina.sistemaOperacional, maquina.fabricanteSO FROM maquina JOIN funcionario ON fkFuncionario = idFuncionario WHERE funcionario.fkEmpresa = ${fkEmpresa};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getUltimoEspecificacaoMaquinaCadastrada() {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    SELECT idEspecificacaoComponente, nomeEspecificacao FROM especificacaoComponente ORDER BY idEspecificacaoComponente DESC LIMIT 3;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEspecificacaoDisco(fkMaquina, fkEmpresa, idFuncionario, fkEspecificacaoTamanhoTotalDisco) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        INSERT INTO especificacaoComponente (idEspecificacaoComponente, nomeEspecificacao, informacaoTotalEspecificacao, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES (${fkEspecificacaoTamanhoTotalDisco}, 'Tamanho total', null, 1, ${fkMaquina}, ${idFuncionario}, ${fkEmpresa});
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
            
function cadastrarEspecificacaoMemoria(fkMaquina, fkEmpresa, idFuncionario, fkEspecificacaoMemoriaTotalRam) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    INSERT INTO especificacaoComponente (idEspecificacaoComponente, nomeEspecificacao, informacaoTotalEspecificacao, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES (${fkEspecificacaoMemoriaTotalRam}, 'Memória total', null, 2, ${fkMaquina}, ${idFuncionario}, ${fkEmpresa});
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
            
function cadastrarEspecificacaoCPU(fkMaquina, fkEmpresa, idFuncionario, fkEspecificacaoFrequenciaCpu) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    INSERT INTO especificacaoComponente (idEspecificacaoComponente, nomeEspecificacao, informacaoTotalEspecificacao, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES (${fkEspecificacaoFrequenciaCpu}, 'Frequência', null, 3, ${fkMaquina}, ${idFuncionario}, ${fkEmpresa});
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function getUltimoIDFuncionario(fkEmpresa) {
//     console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
//     var instrucao = `
//     SELECT idFuncionario FROM funcionario WHERE fkEmpresa = ${fkEmpresa} ORDER BY idFuncionario DESC LIMIT 1;
//     `
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function getUltimoIDFuncionario(fkEmpresa) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    SELECT TOP 1 idFuncionario FROM funcionario WHERE fkEmpresa = ${fkEmpresa} ORDER BY idFuncionario DESC;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function getUltimoStatusRegistro(fkEmpresa, idFuncionario) {
//     console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
//     var instrucao = `
//     SELECT funcionario.idFuncionario, funcionario.nome, maquina.nomeMaquina, componente.nomeComponente, registrosEspecificacaoComponente.tipoRegistro, registrosEspecificacaoComponente.registroNumero, registrosEspecificacaoComponente.statusRegistro, registrosEspecificacaoComponente.dataHoraRegistro
// 	FROM registrosEspecificacaoComponente 
// 		JOIN especificacaoComponente ON registrosEspecificacaoComponente.fkEspecificacaoComponente = idEspecificacaoComponente
//         JOIN componente ON especificacaoComponente.fkComponente = idComponente
// 		JOIN maquina ON especificacaoComponente.fkMaquina = idMaquina
//         JOIN funcionario ON maquina.fkFuncionario = idFuncionario
// 			WHERE registrosEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND funcionario.idFuncionario = ${idFuncionario}  
//         ORDER BY registrosEspecificacaoComponente.dataHoraRegistro DESC
//         LIMIT 5;
//     `
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function getUltimoStatusRegistro(fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
     SELECT TOP 5 funcionario.idFuncionario, funcionario.nome, maquina.nomeMaquina, componente.nomeComponente, registroEspecificacaoComponente.tipoRegistro, registroEspecificacaoComponente.registroNumero, registroEspecificacaoComponente.statusRegistro, registroEspecificacaoComponente.dataHoraRegistro
    FROM registroEspecificacaoComponente 
        JOIN especificacaoComponente ON registroEspecificacaoComponente.fkEspecificacaoComponente = idEspecificacaoComponente
        JOIN componente ON especificacaoComponente.fkComponente = idComponente
        JOIN maquina ON especificacaoComponente.fkMaquina = idMaquina
        JOIN funcionario ON maquina.fkFuncionario = idFuncionario
            WHERE registroEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND funcionario.idFuncionario = ${idFuncionario}  
        ORDER BY registroEspecificacaoComponente.dataHoraRegistro DESC;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function getUltimosRegistroComponentesUsoCpu(fkEmpresa, idFuncionario) {
//     console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
//     var instrucao = `
//     SELECT date_format(registrosEspecificacaoComponente.dataHoraRegistro, '%i:%s') AS dataRegistro, registrosEspecificacaoComponente.registroNumero, registrosEspecificacaoComponente.tipoRegistro, componente.nomeComponente, registrosEspecificacaoComponente.statusRegistro,
//     maquina.nomeMaquina FROM registrosEspecificacaoComponente
// 	JOIN maquina ON registrosEspecificacaoComponente.fkMaquina = idMaquina
//     JOIN componente ON registrosEspecificacaoComponente.fkComponente = idComponente
// 		WHERE registrosEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND registrosEspecificacaoComponente.fkFuncionario = ${idFuncionario} AND registrosEspecificacaoComponente.tipoRegistro = 'Uso do processador'
//         ORDER BY registrosEspecificacaoComponente.dataHoraRegistro DESC LIMIT 10;       
//     `
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function getUltimosRegistroComponentesUsoCpu(fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    SELECT TOP 10 format(registroEspecificacaoComponente.dataHoraRegistro, 'mm:ss') AS dataRegistro, registroEspecificacaoComponente.registroNumero, registroEspecificacaoComponente.tipoRegistro, componente.nomeComponente, registroEspecificacaoComponente.statusRegistro,
    maquina.nomeMaquina FROM registroEspecificacaoComponente
    JOIN maquina ON registroEspecificacaoComponente.fkMaquina = idMaquina
    JOIN componente ON registroEspecificacaoComponente.fkComponente = idComponente
        WHERE registroEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND registroEspecificacaoComponente.fkFuncionario = ${idFuncionario} AND registroEspecificacaoComponente.tipoRegistro = 'Uso do processador'
        ORDER BY registroEspecificacaoComponente.dataHoraRegistro DESC;       
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function getUltimosRegistroComponentesUsoMemoriaRam(fkEmpresa, idFuncionario) {
//     console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
//     var instrucao = `
//     SELECT date_format(registrosEspecificacaoComponente.dataHoraRegistro, '%i:%s') AS dataRegistro, registrosEspecificacaoComponente.registroNumero, registrosEspecificacaoComponente.tipoRegistro, componente.nomeComponente, registrosEspecificacaoComponente.statusRegistro,
//     maquina.nomeMaquina FROM registrosEspecificacaoComponente
// 	JOIN maquina ON registrosEspecificacaoComponente.fkMaquina = idMaquina
//     JOIN componente ON registrosEspecificacaoComponente.fkComponente = idComponente
// 		WHERE registrosEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND registrosEspecificacaoComponente.fkFuncionario = ${idFuncionario} AND registrosEspecificacaoComponente.tipoRegistro = 'Memória em uso'
//         ORDER BY registrosEspecificacaoComponente.dataHoraRegistro DESC LIMIT 10;       
//     `
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function getUltimosRegistroComponentesUsoMemoriaRam(fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
     SELECT TOP 10 format(registroEspecificacaoComponente.dataHoraRegistro, 'mm:ss') AS dataRegistro, registroEspecificacaoComponente.registroNumero, registroEspecificacaoComponente.tipoRegistro, componente.nomeComponente, registroEspecificacaoComponente.statusRegistro,
    maquina.nomeMaquina FROM registroEspecificacaoComponente
    JOIN maquina ON registroEspecificacaoComponente.fkMaquina = idMaquina
    JOIN componente ON registroEspecificacaoComponente.fkComponente = idComponente
        WHERE registroEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND registroEspecificacaoComponente.fkFuncionario = ${idFuncionario} AND registroEspecificacaoComponente.tipoRegistro = 'Memória em uso'
        ORDER BY registroEspecificacaoComponente.dataHoraRegistro DESC;       
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function getUltimosRegistroComponentesUsoDisco(fkEmpresa, idFuncionario) {
//     console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
//     var instrucao = `
//     SELECT date_format(registrosEspecificacaoComponente.dataHoraRegistro, '%i:%s') AS dataRegistro, registrosEspecificacaoComponente.registroNumero, registrosEspecificacaoComponente.tipoRegistro, componente.nomeComponente, registrosEspecificacaoComponente.statusRegistro,
//     maquina.nomeMaquina FROM registrosEspecificacaoComponente
// 	JOIN maquina ON registrosEspecificacaoComponente.fkMaquina = idMaquina
//     JOIN componente ON registrosEspecificacaoComponente.fkComponente = idComponente
// 		WHERE registrosEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND registrosEspecificacaoComponente.fkFuncionario = ${idFuncionario} AND registrosEspecificacaoComponente.tipoRegistro = 'Espaço disponível'
//         ORDER BY registrosEspecificacaoComponente.dataHoraRegistro DESC LIMIT 10;       
//     `
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function getUltimosRegistroComponentesUsoDisco(fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    SELECT TOP 10 format(registroEspecificacaoComponente.dataHoraRegistro, 'mm:ss') AS dataRegistro, registroEspecificacaoComponente.registroNumero, registroEspecificacaoComponente.tipoRegistro, componente.nomeComponente, registroEspecificacaoComponente.statusRegistro,
    maquina.nomeMaquina FROM registroEspecificacaoComponente
    JOIN maquina ON registroEspecificacaoComponente.fkMaquina = idMaquina
    JOIN componente ON registroEspecificacaoComponente.fkComponente = idComponente
        WHERE registroEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND registroEspecificacaoComponente.fkFuncionario = ${idFuncionario} AND registroEspecificacaoComponente.tipoRegistro = 'Espaço disponível'
        ORDER BY registroEspecificacaoComponente.dataHoraRegistro DESC;     
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function getUltimosRegistroComponentesTemperaturaCpu(fkEmpresa, idFuncionario) {
//     console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
//     var instrucao = `
//     SELECT date_format(registrosEspecificacaoComponente.dataHoraRegistro, '%i:%s') AS dataRegistro, registrosEspecificacaoComponente.registroNumero, registrosEspecificacaoComponente.tipoRegistro, componente.nomeComponente, registrosEspecificacaoComponente.statusRegistro,
//     maquina.nomeMaquina FROM registrosEspecificacaoComponente
// 	JOIN maquina ON registrosEspecificacaoComponente.fkMaquina = idMaquina
//     JOIN componente ON registrosEspecificacaoComponente.fkComponente = idComponente
// 		WHERE registrosEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND registrosEspecificacaoComponente.fkFuncionario = ${idFuncionario} AND registrosEspecificacaoComponente.tipoRegistro = 'Temperatura da CPU'
//         ORDER BY registrosEspecificacaoComponente.dataHoraRegistro DESC LIMIT 10;       
//     `
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function getUltimosRegistroComponentesTemperaturaCpu(fkEmpresa, idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    SELECT TOP 10 format(registroEspecificacaoComponente.dataHoraRegistro, 'mm:ss') AS dataRegistro, registroEspecificacaoComponente.registroNumero, registroEspecificacaoComponente.tipoRegistro, componente.nomeComponente, registroEspecificacaoComponente.statusRegistro,
    maquina.nomeMaquina FROM registroEspecificacaoComponente
    JOIN maquina ON registroEspecificacaoComponente.fkMaquina = idMaquina
    JOIN componente ON registroEspecificacaoComponente.fkComponente = idComponente
        WHERE registroEspecificacaoComponente.fkEmpresa = ${fkEmpresa} AND registroEspecificacaoComponente.fkFuncionario = ${idFuncionario} AND registroEspecificacaoComponente.tipoRegistro = 'Temperatura da CPU'
        ORDER BY registroEspecificacaoComponente.dataHoraRegistro DESC;         
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
    SET status = 'ABERTO', prioridade = '${nivelPrioridade}', fkUsuario = ${fkUsuario} 
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

function buscarQuantidadeDeAlertas(fkEmpresa, dataSelecionada) {
    console.log("Script do banco de dados para buscar a quantidade de alertas por cada componente")
    var instrucao = `
   
        SELECT statusRegistro, nomeComponente, COUNT(*) AS TotalRegistros                     
        FROM componente c
        JOIN registroEspecificacaoComponente r ON c.idComponente = r.fkComponente
        WHERE statusRegistro IN ('Alerta', 'Crítico') 
        AND fkEmpresa = ${fkEmpresa}
        AND CAST(dataHoraRegistro AS DATE) = '${dataSelecionada}'
        GROUP BY statusRegistro, nomeComponente;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarQuantidadeDeMaquinasEmAlerta(fkEmpresa) {
    console.log("Script do banco de dados para buscar os ultimos registros de cada maquina da empresa")
    var instrucao = `
   
    WITH UltimosRegistros AS (
        SELECT 
            r.fkMaquina,
            r.dataHoraRegistro,
            r.statusRegistro,
            f.statusLogin, -- Adiciona statusLogin aqui
            
            ROW_NUMBER() OVER (PARTITION BY r.fkMaquina ORDER BY r.dataHoraRegistro DESC) AS rn
        FROM 
            registroEspecificacaoComponente r
        JOIN 
            maquina m ON r.fkMaquina = m.idMaquina
        JOIN 
            funcionario f ON m.fkFuncionario = f.idFuncionario
        WHERE 
            m.fkEmpresa = ${fkEmpresa} AND f.statusLogin = 'Logado'
        )
        SELECT 
            fkMaquina,
            dataHoraRegistro,
            statusRegistro,
            statusLogin
            FROM 
                UltimosRegistros
            WHERE 
                rn <= 5
            ORDER BY 
            fkMaquina, rn;
    
    
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}   

function buscarQtdChamadosAbertos(fkEmpresa) {
    console.log("Script do banco de dados para buscar todos os chamados ABERTO de uma determinada empresa")
    var instrucao = `
   
        SELECT COUNT(*) AS TotalChamados                   
        FROM chamado 
        WHERE status = 'ABERTO' AND fkEmpresa = ${fkEmpresa}
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarQtdMaquinasTotal(fkEmpresa) {
    console.log("Script do banco de dados para buscar todos os chamados EM_ANDAMENTO de uma determinada empresa")
    var instrucao = `
       
		SELECT 
        (SELECT COUNT(*) FROM maquina WHERE fkEmpresa = ${fkEmpresa}) AS totalMaquinas,
        (SELECT COUNT(*) FROM funcionario f
        LEFT JOIN maquina m ON f.idFuncionario = m.fkFuncionario
        WHERE f.fkEmpresa = ${fkEmpresa}) AS totalFuncionarios
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarChamadosAbertos(fkEmpresa) {
    console.log("Script do banco de dados para buscar todos os chamados EM_ANDAMENTO de uma determinada empresa")
    var instrucao = `
    SELECT 
        c.idChamado, 
        FORMAT(c.dataAbertura, 'dd/MM/yyyy HH:mm:ss') AS dataAberturaFormatada, 
        c.status, 
        c.prioridade,
        c.mensagem, 
        u.nome 
    FROM 
        chamado c 
    JOIN 
        usuario u ON c.fkUsuario = u.idUsuario 
    WHERE 
        c.fkEmpresa = ${fkEmpresa} AND c.status IN('ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO')
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirDadosDoChamado(idChamado) {
    console.log("Script do banco de dados para buscar todos os chamados EM_ANDAMENTO de uma determinada empresa")
    var instrucao = `
    SELECT 
            c.idChamado, 
            FORMAT(c.dataAbertura, 'dd/MM/yyyy HH:mm:ss') AS dataAberturaFormatada, 
            c.status, 
            c.prioridade,
            c.mensagem, 
            u.nome,
            u.idUsuario,
            f.email,
            f.idFuncionario,
            m.idMaquina,
            m.fkEmpresa,
            h.descricaoProblema,
            h.descricaoSolucao
        FROM 
            chamado c 
        JOIN 
            usuario u ON c.fkUsuario = u.idUsuario 
        JOIN 
            funcionario f ON f.idFuncionario = c.fkFuncionario
        LEFT JOIN 
            maquina m ON m.fkFuncionario = f.idFuncionario
        LEFT JOIN 
            historicoChamado h on h.fkChamado = c.idChamado
        WHERE 
            idChamado = ${idChamado}
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mudarStatusChamado(statusSelecionado, idChamado, dataFechamento) {
    console.log("Script do banco de dados que atualiza o status de um chamado para removido")
    var instrucao = ``

    if(dataFechamento != null) {
        instrucao = `
    
        UPDATE chamado 
        SET status = '${statusSelecionado}', dataFechamento = '${dataFechamento}'
        WHERE idChamado = ${idChamado}
        `
    }else{
        instrucao = `
    
        UPDATE chamado 
        SET status = '${statusSelecionado}'
        WHERE idChamado = ${idChamado}
        `
    }
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInformacoesHistorico(idChamado) {
    console.log("Script do banco de dados que atualiza o status de um chamado para removido")
    var instrucao = `
   
    SELECT motivo, descricaoProblema, descricaoSolucao from historicoChamado where fkChamado = ${idChamado}
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
}

function salvarHistoricoChamado(idChamado, descricaoProblema, descricaoSolucao, idFuncionario, idUsuario, idMaquina, fkEmpresa) {
    console.log("Script do banco de dados que atualiza o status de um chamado para removido")
    var instrucao = `
   
        INSERT INTO historicoChamado VALUES (${idMaquina}, ${idChamado}, ${idUsuario}, ${idFuncionario}, ${fkEmpresa}, null, '${descricaoProblema}', '${descricaoSolucao}')
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarHistoricoChamado(idChamado, descricaoProblema, descricaoSolucao) {
    console.log("Script do banco de dados que atualiza o status de um chamado para removido")
    var instrucao = `
   
    UPDATE historicoChamado 
    SET descricaoProblema = '${descricaoProblema}', descricaoSolucao = '${descricaoSolucao}'
    WHERE fkChamado = ${idChamado}
    
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificarSeExisteHistorico(idChamado) {
    console.log("Script do banco de dados que atualiza o status de um chamado para removido")
    var instrucao = `
   
    select * from historicoChamado where fkChamado = ${idChamado}
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
}



module.exports = {
    tecnicoCadastrarMaquina,
    cadastrarMetricaMaquinaEspaçoDisponivel,
    cadastrarMetricaMaquinaMemoriaUso,
    cadastrarMetricaMaquinaUsoProcessador,
    cadastrarMetricaMaquinaTemperaturaCpu,
    getDadosMaquina,
    getUltimoEspecificacaoMaquinaCadastrada,
    cadastrarEspecificacaoDisco,
    cadastrarEspecificacaoMemoria,
    getUltimoIDFuncionario,
    getUltimoStatusRegistro,
    getUltimosRegistroComponentesUsoCpu,
    getUltimosRegistroComponentesUsoMemoriaRam,
    getUltimosRegistroComponentesUsoDisco,
    getUltimosRegistroComponentesTemperaturaCpu,
    cadastrarEspecificacaoCPU ,
    buscarChamadosPendentes,
    validarChamado,
    removerChamado,
    buscarQuantidadeDeAlertas,
    buscarQuantidadeDeMaquinasEmAlerta,
    buscarQtdChamadosAbertos,
    buscarQtdMaquinasTotal,
    buscarChamadosAbertos,
    exibirDadosDoChamado,
    mudarStatusChamado,
    buscarInformacoesHistorico,
    salvarHistoricoChamado,
    atualizarHistoricoChamado,
    verificarSeExisteHistorico,
    
}