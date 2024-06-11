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

function excluirContaUsuario(idUsuario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        DELETE FROM usuario WHERE idUsuario = ${idUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao); 
}

function getDadosFuncionario(fkEmpresa){
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        SELECT idFuncionario, nome, cpf, area, email, senha FROM funcionario WHERE fkEmpresa = '${fkEmpresa}';
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirContaFuncionario(idFuncionario) {
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        DELETE FROM funcionario WHERE idFuncionario = ${idFuncionario};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao); 
}

function pegarDadosGrafico1(fkEmpresa) {
    var instrucao = `
    SELECT 
    FORMAT(CONVERT(date, dataFechamento), 'dd/MM') AS Data,
    AVG(DATEDIFF(MINUTE, dataAbertura, dataFechamento)) AS TempoMedioChamadoMinutos,
    CAST(FLOOR(AVG(DATEDIFF(MINUTE, dataAbertura, dataFechamento)) / 60) AS VARCHAR) 
    + ':' + 
    RIGHT('0' + CAST(AVG(DATEDIFF(MINUTE, dataAbertura, dataFechamento)) % 60 AS VARCHAR), 2) 
    AS TempoMedioChamadoHorasMinutos
    FROM 
        Chamado
    WHERE 
        status = 'CONCLUIDO' -- Considerando apenas os chamados fechados
        AND fkEmpresa = ${fkEmpresa} -- Condição para a empresa específica
    GROUP BY 
        CONVERT(date, dataFechamento);


    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarDadosGrafico2(fkEmpresa) {
    var instrucao = `
    WITH Abertos AS (
        SELECT 
            CAST(dataAbertura AS DATE) AS Dia,
            COUNT(*) AS ChamadosAbertos
        FROM 
            Chamado
        WHERE
            fkEmpresa = ${fkEmpresa}
        GROUP BY 
            CAST(dataAbertura AS DATE)
    ),
    Fechados AS (
        SELECT 
            CAST(dataFechamento AS DATE) AS Dia,
            COUNT(*) AS ChamadosFechados
        FROM 
            Chamado
        WHERE
            fkEmpresa = ${fkEmpresa} AND status = 'CONCLUIDO'
        GROUP BY 
            CAST(dataFechamento AS DATE)
    ),
    EmAndamento AS (
        SELECT 
            CAST(dataAbertura AS DATE) AS Dia,
            COUNT(*) AS ChamadosEmAndamento
        FROM 
            Chamado
        WHERE
            fkEmpresa = ${fkEmpresa} AND status = 'EM_ANDAMENTO'
        GROUP BY 
            CAST(dataAbertura AS DATE)
    ),
    Removidos AS (
        SELECT 
            CAST(dataAbertura AS DATE) AS Dia,
            COUNT(*) AS ChamadosRemovidos
        FROM 
            Chamado
        WHERE
            fkEmpresa = ${fkEmpresa} AND status = 'REMOVIDO'
        GROUP BY 
            CAST(dataAbertura AS DATE)
    )
    SELECT 
        FORMAT(COALESCE(A.Dia, F.Dia, EA.Dia, R.Dia), 'dd/MM') AS Dia,
        COALESCE(ChamadosAbertos, 0) AS ChamadosAbertos,
        COALESCE(ChamadosFechados, 0) AS ChamadosFechados,
        COALESCE(ChamadosEmAndamento, 0) AS ChamadosEmAndamento,
        COALESCE(ChamadosRemovidos, 0) AS ChamadosRemovidos
    FROM 
        Abertos A
    FULL OUTER JOIN 
        Fechados F ON A.Dia = F.Dia
    FULL OUTER JOIN
        EmAndamento EA ON A.Dia = EA.Dia
    FULL OUTER JOIN
        Removidos R ON A.Dia = R.Dia
    ORDER BY 
        COALESCE(A.Dia, F.Dia, EA.Dia, R.Dia);

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function contarComputadoresEmAlerta(fkEmpresa){
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
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

function contarChamadosPrioritariosAbertos(fkEmpresa){
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
    SELECT 
        COUNT(*) AS Quantidade
    FROM 
        Chamado
    WHERE 
        status = 'ABERTO'
        AND prioridade = 'alta'
        AND fkEmpresa = ${fkEmpresa};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function contarAlertasMaisTempo(fkEmpresa){
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        SELECT COUNT(idUsuario) FROM usuario;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    cadastrarUsuario,
    gestorCadastrarFuncionario,
    buscarInformacoesUsuario,
    editarInformacoesUsuario,
    excluirContaUsuario,
    getDadosFuncionario,
    excluirContaFuncionario,
    pegarDadosGrafico1,
    pegarDadosGrafico2,
    contarComputadoresEmAlerta,
    contarChamadosPrioritariosAbertos,
    contarAlertasMaisTempo
};