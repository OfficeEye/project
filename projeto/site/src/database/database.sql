CREATE DATABASE officeeye;
DROP DATABASE officeeye;
USE officeeye;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeFantasia VARCHAR(45),
razaoSocial VARCHAR(45),
cnpj CHAR(14)
);

CREATE TABLE usuario (
  idUsuario INT NOT NULL auto_increment,
  nome VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  tipo VARCHAR(45) NULL,
  cpf CHAR(12) NULL,
  senha VARCHAR(45) NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idUsuario, fkEmpresa),
  CONSTRAINT fk_usuario_empresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa (idEmpresa)
);

CREATE TABLE funcionario (
  idFuncionario INT NOT NULL auto_increment,
  nome VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  cpf VARCHAR(12) NULL,
  area VARCHAR(45) NULL,
  senha VARCHAR(45) NULL, 
  fkEmpresa INT NOT NULL,
  statusLogin VARCHAR(45) NULL,
  inicioExpediente DATETIME NULL,
  finalExpediente DATETIME NULL,
  PRIMARY KEY (idFuncionario, fkEmpresa),
  CONSTRAINT fk_funcionario_empresa1
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa (idEmpresa));

CREATE TABLE maquina (
  idMaquina INT NOT NULL auto_increment,
  modelo VARCHAR(45) NULL,
  fabricanteSO VARCHAR(45) NULL,
  nomeMaquina VARCHAR(45) NULL,
  sistemaOperacional VARCHAR(45) NULL,
  fkFuncionario INT NOT NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idmaquina, fkFuncionario, fkEmpresa),
  CONSTRAINT fk_maquina_funcionario1
    FOREIGN KEY (fkFuncionario , fkEmpresa)
    REFERENCES funcionario (idFuncionario , fkEmpresa)
);

CREATE TABLE componente (
  idComponente INT NOT NULL auto_increment,
  nomeComponente VARCHAR(45) NULL,
  PRIMARY KEY (idComponente)
);
  
  CREATE TABLE especificacaoComponente (
  idEspecificacaoComponente INT NOT NULL auto_increment,
  nomeEspecificacao VARCHAR(45) NULL,
  informacaoTotalEspecificacao DECIMAL(5,2) NULL,
  fkComponente INT NOT NULL,
  fkMaquina INT NOT NULL,
  fkFuncionario INT NOT NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idespecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa),
  CONSTRAINT fk_especificacaoComponentes_componente1
    FOREIGN KEY (fkComponente)
    REFERENCES componente (idcomponente),
    CONSTRAINT fk_especificacaoComponentes_maquina1
    FOREIGN KEY (fkMaquina, fkFuncionario, fkEmpresa)
    REFERENCES maquina (idMaquina, fkFuncionario, fkEmpresa)
);

CREATE TABLE metricaComponente (
	idMetricaComponente INT NOT NULL auto_increment,
    porcentagemIdeal DECIMAL(4,2) NULL,
    porcentagemAlerta DECIMAL(4, 2) NULL,
    porcentagemCritico DECIMAL(4, 2) NULL,
    fkEspecificacaoComponente INT NOT NULL,
    fkComponente INT NOT NULL,
    fkMaquina INT NOT NULL, 
    fkFuncionario INT NOT NULL,
    fkEmpresa INT NOT NULL,
    nomeMetrica VARCHAR(45) NULL,
    PRIMARY KEY (idMetricaComponente, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa),
    CONSTRAINT fk_especificacaoComponente_componente_maquina
    FOREIGN KEY(fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa)
    REFERENCES especificacaoComponente (idEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa)
);

CREATE TABLE registrosEspecificacaoComponente (
  idRegistro INT NOT NULL auto_increment,
  dataHoraRegistro DATETIME NULL,
  registroNumero DECIMAL(5,2) NULL,
  tipoRegistro VARCHAR(45) NULL,
  fkEspecificacaoComponente INT NOT NULL,
  fkComponente INT NOT NULL,
  fkMaquina INT NOT NULL,
  fkFuncionario INT NOT NULL,
  fkEmpresa INT NOT NULL,
  statusRegistro VARCHAR(45) NULL,
  PRIMARY KEY (idRegistro, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa),
  CONSTRAINT fk_RegistrosMaquina_especificacaoComponente1
    FOREIGN KEY (fkEspecificacaoComponente , fkComponente , fkMaquina , fkFuncionario , fkEmpresa)
    REFERENCES especificacaoComponente (idEspecificacaoComponente , fkComponente , fkMaquina , fkFuncionario , fkEmpresa)
);

CREATE TABLE Chamado (
  idChamado INT NOT NULL auto_increment,
  dataAbertura DATETIME NULL,
  dataFechamento DATETIME NULL,
  status VARCHAR(45) NULL,
  prioridade VARCHAR(45),
  fkUsuario INT NOT NULL,
  fkFuncionario INT NOT NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idChamado, fkUsuario, fkFuncionario, fkEmpresa),
  CONSTRAINT fk_Chamados_usuario1
    FOREIGN KEY (fkUsuario , fkEmpresa)
    REFERENCES usuario (idUsuario , fkEmpresa),
	CONSTRAINT fk_Chamado_Funcionario1
    FOREIGN KEY (fkFuncionario)
	REFERENCES funcionario (idFuncionario)
);

CREATE TABLE HistoricoChamado (
  idHistoricoChamado INT NOT NULL auto_increment,
  fkMaquina INT NOT NULL,
  fkChamado INT NOT NULL,
  fkUsuario INT NOT NULL,
  fkFuncionario INT NOT NULL,
  fkEmpresa INT NOT NULL,
  motivo VARCHAR(45) NULL,
  descricaoProblema VARCHAR(255) NULL,
  descricaoSolucao VARCHAR(255) NULL,
  PRIMARY KEY (idHistoricoChamado, fkMaquina, fkChamado, fkUsuario, fkFuncionario, fkEmpresa),
  CONSTRAINT fk_maquina_has_Chamados_maquina1
    FOREIGN KEY (fkMaquina)
    REFERENCES maquina (idmaquina),
    CONSTRAINT fk_maquina_has_Chamados_Chamados1
    FOREIGN KEY (fkChamado , fkUsuario , fkFuncionario, fkEmpresa)
    REFERENCES Chamado (idChamado , fkUsuario , fkFuncionario, fkEmpresa));

INSERT INTO componente (nomeComponente) VALUES ("Disco");
INSERT INTO componente (nomeComponente) VALUES ("Memória");
INSERT INTO componente (nomeComponente) VALUES ("CPU");

SELECT * FROM empresa; 
SELECT * FROM usuario; 
SELECT * FROM funcionario;
SELECT * FROM maquina;
SELECT * FROM componente;
SELECT * FROM especificacaoComponente;
SELECT * FROM metricaComponente;
SELECT * FROM registrosEspecificacaoComponente;

INSERT INTO empresa (idEmpresa, nomeFantasia, razaoSocial, cnpj) VALUES (1, 'SPTech', 'SPTechSchool', 11111111111111);
INSERT INTO usuario (idUsuario, nome, email, tipo, cpf, senha, fkEmpresa) VALUES (1, 'Leonardo', 'leo@gmail.com', 'gestor', 11111111111, 111111, 1);
INSERT INTO usuario (idUsuario nome, email, tipo, cpf, senha, fkEmpresa) VALUES (2, 'Hugo', 'hugo@gmail.com', 'tecnico', 11111111111, 111111, 1);
INSERT INTO funcionario (idFuncionario, nome, email, cpf, area, senha, fkEmpresa) VALUES (1, 'Antonio', 'antonio@gmail.com', 11111111111, 'estagiario', 111111, 1);
INSERT INTO funcionario (idFuncionario, nome, email, cpf, area, senha, fkEmpresa) VALUES (2, 'Gabriela', 'gabriela@gmail.com', 11111111111, 'estagiario', 111111, 1);
INSERT INTO maquina (idMaquina, modelo, nomeMaquina, fkFuncionario, fkEmpresa) VALUES (1, 'aoc', 'MaquinaAntonio', 1, 1);
INSERT INTO maquina (idMaquina, modelo, nomeMaquina, fkFuncionario, fkEmpresa) VALUES (2, 'acer', 'MaquinaGabriela', 2, 1);
INSERT INTO especificacaoComponente (idEspecificacaoComponente, nomeEspecificacaoa, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES (1, 'Tamanho total', 1, 1, 1, 1);
INSERT INTO especificacaoComponente (idEspecificacaoComponente, nomeEspecificacaoa, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES (2, 'Memória total', 2, 1, 1, 1);
INSERT INTO especificacaoComponente (idEspecificacaoComponente, nomeEspecificacaoa, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES (3, 'Frequência', 3, 1, 1, 1);
INSERT INTO especificacaoComponente (idEspecificacaoComponente, nomeEspecificacaoa, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES (4, 'Tamanho total', 1, 2, 2, 1);
INSERT INTO especificacaoComponente (idEspecificacaoComponente, nomeEspecificacaoa, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES (5, 'Memória total', 2, 2, 2, 1);
INSERT INTO especificacaoComponente (idEspecificacaoComponente, nomeEspecificacaoa, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES (6, 'Frequência', 3, 2, 2, 1);
INSERT INTO metricaComponente (idMetricaComponente, porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (1, '20.00', '19.00', '9.00', '1', '1', '1', '1', '1', 'Espaço disponível no disco'
);
INSERT INTO metricaComponente (idMetricaComponente, porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (2, '70.00', '71.00', '81.00', '2', '2', '1', '1', '1', 'Memória em uso'
);
INSERT INTO metricaComponente (idMetricaComponente, porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (3, '30.00', '71.00', '90.00', '3', '3', '1', '1', '1', 'Uso do processador'
);
INSERT INTO metricaComponente (idMetricaComponente, porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (4, '79.00', '80.00', '90.00', '3', '3', '1', '1', '1', 'Temperatura da CPU'
);
INSERT INTO metricaComponente (idMetricaComponente, porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (5, '70.00', '71.00', '81.00', '5', '2', '2', '2', '1', 'Memória em uso'
);
INSERT INTO metricaComponente (idMetricaComponente, porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (6, '20.00', '19.00', '9.00', '4', '1', '2', '2', '1', 'Espaço disponível no disco'
);
INSERT INTO metricaComponente (idMetricaComponente, porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (7, '79.00', '80.00', '90.00', '6', '3', '2', '2', '1', 'Temperatura da CPU'
);
INSERT INTO metricaComponente (idMetricaComponente, porcentagemIdeal, porcentagemAlerta, porcentagemCritico, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa, nomeMetrica) VALUES (8, '30.00', '71.00', '90.00', '6', '3', '2', '2', '1', 'Uso do processador'
);

INSERT INTO registrosEspecificacaoComponente (dataHoraRegistro, registroNumero, tipoRegistro, 
statusRegistro, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES
('2024-12-08 09:10:10', 40.70, 'Espaço disponível', 'Critico', 1, 1, 1, 1, 1);

INSERT INTO registrosEspecificacaoComponente (dataHoraRegistro, registroNumero, tipoRegistro, 
statusRegistro, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES
('2024-12-08 09:10:10', 130.70, 'Memória em uso', 'Critico', 2, 2, 1, 1, 1);

INSERT INTO registrosEspecificacaoComponente (dataHoraRegistro, registroNumero, tipoRegistro, 
statusRegistro, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES
('2024-12-08 09:10:10', 72.38, 'Uso do processador', 'Critico', 3, 3, 1, 1, 1);

INSERT INTO registrosEspecificacaoComponente (dataHoraRegistro, registroNumero, tipoRegistro, 
statusRegistro, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES
('2024-12-08 09:10:10', 72.38, 'Total de processos', 'Alerta', 3, 3, 1, 1, 1);

INSERT INTO registrosEspecificacaoComponente (dataHoraRegistro, registroNumero, tipoRegistro, 
statusRegistro, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa) VALUES
('2024-12-08 09:10:10', 72.38, 'Temperatura da CPU', 'Alerta', 3, 3, 1, 1, 1);