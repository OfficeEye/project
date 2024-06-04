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
  cpf VARCHAR(12) NULL,
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
  cpf VARCHAR(12) NULL,
  area VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  senha VARCHAR(45) NULL, 
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idFuncionario, fkEmpresa),
  CONSTRAINT fk_funcionario_empresa1
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa (idEmpresa));

CREATE TABLE maquina (
  idMaquina INT NOT NULL auto_increment,
  modelo VARCHAR(45) NULL,
  fabricante VARCHAR(45) NULL,
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
  idEspecificacaoComponentes INT NOT NULL auto_increment,
  nomeEspecificacao VARCHAR(45) NULL,
  informacaoTotalEspecificacao DECIMAL(5,2) NULL,
  fkComponente INT NOT NULL,
  fkMaquina INT NOT NULL,
  fkFuncionario INT NOT NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idespecificacaoComponentes, fkComponente, fkMaquina, fkFuncionario, fkEmpresa),
  CONSTRAINT fk_especificacaoComponentes_componente1
    FOREIGN KEY (fkComponente)
    REFERENCES componente (idcomponente),
    CONSTRAINT fk_especificacaoComponentes_maquina1
    FOREIGN KEY (fkMaquina, fkFuncionario, fkEmpresa)
    REFERENCES maquina (idMaquina, fkFuncionario, fkEmpresa)
);

CREATE TABLE registrosEspecificacaoComponente (
  idRegistros INT NOT NULL auto_increment,
  dataHoraRegistro DATETIME NULL,
  registroNumero DECIMAL(5,2) NULL,
  tipoRegistro VARCHAR(45) NULL,
  statusRegistro VARCHAR(45) NULL,
  fkEspecificacaoComponente INT NOT NULL,
  fkComponente INT NOT NULL,
  fkMaquina INT NOT NULL,
  fkFuncionario INT NOT NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idRegistros, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa),
  CONSTRAINT fk_RegistrosMaquina_especificacaoComponente1
    FOREIGN KEY (fkEspecificacaoComponente , fkComponente , fkMaquina , fkFuncionario , fkEmpresa)
    REFERENCES especificacaoComponente (idEspecificacaoComponentes , fkComponente , fkMaquina , fkFuncionario , fkEmpresa)
);

CREATE TABLE metricaEspecificacaoComponente (
  idMetricaEspecificacaoComponente INT NOT NULL auto_increment,
  porcentagemIdeal DECIMAL,
  porcentagemAlerta DECIMAL,
  porcentagemCritico DECIMAL,
  fkEspecificacaoComponente INT NOT NULL,
  fkComponente INT NOT NULL,
  fkMaquina INT NOT NULL,
  fkFuncionario INT NOT NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idMetricaEspecificacaoComponente, fkEspecificacaoComponente, fkComponente, fkMaquina, fkFuncionario, fkEmpresa),
  CONSTRAINT fk_Metrica_especificacaoComponente1
    FOREIGN KEY (fkEspecificacaoComponente , fkComponente , fkMaquina , fkFuncionario , fkEmpresa)
    REFERENCES especificacaoComponente (idEspecificacaoComponentes , fkComponente , fkMaquina , fkFuncionario , fkEmpresa));

CREATE TABLE Chamados (
  idChamados INT NOT NULL auto_increment,
  dataAbertura DATETIME NULL,
  dataFechamento DATETIME NULL,
  status VARCHAR(45) NULL,
  nivelPrioridade VARCHAR(45),
  fkUsuario INT NOT NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (idChamados, fkUsuario, fkEmpresa),
  CONSTRAINT fk_Chamados_usuario1
    FOREIGN KEY (fkUsuario , fkEmpresa)
    REFERENCES usuario (idUsuario , fkEmpresa)
);

CREATE TABLE HistoricoChamados (
  idHistoricoChamados INT NOT NULL auto_increment,
  fkMaquina INT NOT NULL,
  fkChamados INT NOT NULL,
  fkUsuario INT NOT NULL,
  fkEmpresa INT NOT NULL,
  motivo VARCHAR(45) NULL,
  descricaoProblema VARCHAR(255) NULL,
  descricaoSolucao VARCHAR(255) NULL,
  PRIMARY KEY (idHistoricoChamados, fkMaquina, fkChamados, fkUsuario, fkEmpresa),
  CONSTRAINT fk_maquina_has_Chamados_maquina1
    FOREIGN KEY (fkMaquina)
    REFERENCES maquina (idmaquina),
    CONSTRAINT fk_maquina_has_Chamados_Chamados1
    FOREIGN KEY (fkChamados , fkUsuario , fkEmpresa)
    REFERENCES Chamados (idChamados , fkUsuario , fkEmpresa));

INSERT INTO componente (nomeComponente) VALUES ("DISCO");
INSERT INTO componente (nomeComponente) VALUES ("MEMÓRIA");
INSERT INTO componente (nomeComponente) VALUES ("CPU");

SELECT * FROM empresa; 
SELECT * FROM usuario;  
SELECT * FROM funcionario;
SELECT * FROM maquina;
SELECT * FROM componente;
SELECT * FROM especificacaoComponente;
SELECT * FROM registrosEspecificacaoComponente;