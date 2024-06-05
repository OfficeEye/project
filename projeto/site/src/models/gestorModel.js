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
        DELETE FROM Usuario WHERE idUsuario = ${idUsuario};
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

function pegarDadosGrafico1(fkEmpresa) {
    var instrucao = `
    SELECT 
    DATE(dataAbertura) AS Dia,
    CONCAT(
        LPAD(FLOOR(AVG(TIMESTAMPDIFF(MINUTE, dataAbertura, dataFechamento)) / 60), 2, '0'), 
        ':', 
        LPAD(MOD(AVG(TIMESTAMPDIFF(MINUTE, dataAbertura, dataFechamento)), 60), 2, '0')
    ) AS TempoMedioChamadoHorasMinutos
FROM 
    Chamados
WHERE 
    status = 'Fechado' -- Considerando apenas os chamados fechados
    AND fkEmpresa = ${fkEmpresa} -- Condição para a empresa específica
GROUP BY 
    DATE(dataAbertura) -- Agrupando por dia de abertura
ORDER BY 
    DATE(dataAbertura) LIMIT 5; -- Ordenando por dia de abertura

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarDadosGrafico2(fkEmpresa) {
    var instrucao = `
    SELECT 
    DATE(dataAbertura) AS Dia,
    SUM(CASE WHEN status = 'Aberto' THEN 1 ELSE 0 END) AS ChamadosAbertos,
    SUM(CASE WHEN status = 'Fechado' THEN 1 ELSE 0 END) AS ChamadosFechados
FROM 
    Chamados
WHERE
    fkEmpresa = ${fkEmpresa}
GROUP BY 
    Dia
ORDER BY 
    Dia;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function contarComputadoresEmAlerta(fkEmpresa){
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        SELECT COUNT(idUsuario) FROM usuario;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function contarChamadosPrioritariosAbertos(fkEmpresa){
    console.log("Script do banco de dados para fazer cadastro - Clonar data viz separadamente e consultar chamado Cadastrar")
    var instrucao = `
        SELECT COUNT(idUsuario) FROM usuario;
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
    getDadosFuncionario
};