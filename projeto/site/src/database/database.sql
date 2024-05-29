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

SELECT * FROM empresa;
SELECT * FROM usuario;
SELECT * FROM funcionario;