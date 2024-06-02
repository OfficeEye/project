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
    console.log("Script do banco de dados para buscar todos os chamados EM_ANDAMENTO de uma determinada empresa")
    var instrucao = `
   
        SELECT COUNT(*) AS TotalChamados                   
        FROM chamado 
        WHERE status = 'EM_ANDAMENTO' AND fkEmpresa = ${fkEmpresa}
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

module.exports = {
    tecnicoCadastrarMaquina,
    getDadosMaquina,
    cadastrarEspecificacaoDisco,
    cadastrarEspecificacaoMemoria,
    cadastrarEspecificacaoCPU ,
    buscarChamadosPendentes,
    validarChamado,
    removerChamado,
    buscarQuantidadeDeAlertas,
    buscarQuantidadeDeMaquinasEmAlerta,
    buscarQtdChamadosAbertos,
    buscarQtdMaquinasTotal
}