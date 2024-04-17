CREATE DATABASE officeeye;
DROP DATABASE officeeye;
USE officeeye;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeFantasia VARCHAR(45),
razaoSocial VARCHAR(45),
cnpj CHAR(14),
email VARCHAR(45),
senha VARCHAR(45)
);