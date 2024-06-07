var tecnicoModel = require("../models/tecnicoModel");

function tecnicoCadastrarMaquina(req, res) {
    var nomeMaquina = req.body.nomeMaquinaServer;
    var modeloMaquina = req.body.modeloMaquinaServer;
    var idFuncionario = req.body.idFuncionarioServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var fkMaquina = req.body.fkMaquinaServer;

    if (nomeMaquina == undefined) {
        res.status(400).send("Seu nomeMaquina está undefined!")
    }else if (modeloMaquina == undefined) {
        res.status(400).send("Seu modeloMaquina está undefined!")
    }else if (idFuncionario == undefined) {
        res.status(400).send("seu idFuncionario está undefined!")
    }else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!")
    }else if(fkMaquina == undefined) {
        res.status(400).send("Sua fkMaquina está undefined!")
    }else {
        tecnicoModel.tecnicoCadastrarMaquina(fkMaquina, nomeMaquina, modeloMaquina, idFuncionario, fkEmpresa).then(
            function (resultados) {
                res.json(resultados);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro de maquina! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }   
}

function cadastrarEspecificacaoMaquina(req, res) {
    var idFuncionario = req.body.idFuncionarioServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var fkMaquina = req.body.fkMaquinaServer;

    if (idFuncionario == undefined) {
        res.status(400).send("seu idFuncionario está undefined!")
    }else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!")
    }else if(fkMaquina == undefined) {
        res.status(400).send("Sua fkMaquina está undefined!")
    }else {
        tecnicoModel.cadastrarEspecificacaoMemoria(fkMaquina, fkEmpresa, idFuncionario).then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

        tecnicoModel.cadastrarEspecificacaoDisco(fkMaquina, fkEmpresa, idFuncionario).then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

        tecnicoModel.cadastrarEspecificacaoCPU(fkMaquina, fkEmpresa, idFuncionario).then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function getDadosMaquina(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.getDadosMaquina(fkEmpresa)
        .then(
            function (resultado) {
                if (resultado.length >= 1){
                    res.json(resultado)
                } else if (resultado.length == 0) {
                    res.status(403).send("fkEmpresa inválido(s)");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            }
        );
    }
}

function getUltimoIDFuncionario(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.getUltimoIDFuncionario(fkEmpresa)
        .then(
            function (resultado) {
                if (resultado.length >= 1){
                    res.json(resultado)
                } else if (resultado.length == 0) {
                    res.status(403).send("fkEmpresa inválido(s)");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            }
        );
    }
}

function getUltimoStatusRegistro(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;
    var idFuncionario = req.body.idFuncionarioServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if (idFuncionario == undefined) {
        res.status(400).send("Seu idFuncionario está undefined!");
    } else {
        tecnicoModel.getUltimoStatusRegistro(fkEmpresa, idFuncionario)
        .then(
            function (resultado) {
                if (resultado.length >= 1){
                    res.json(resultado)
                } else if (resultado.length == 0) {
                    // res.status(403).send("fkEmpresa ou idFuncionario inválido(s)");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            }
        );
    }
}





module.exports = {
    tecnicoCadastrarMaquina,
    cadastrarEspecificacaoMaquina,
    getDadosMaquina,
    getUltimoIDFuncionario,
    getUltimoStatusRegistro
}