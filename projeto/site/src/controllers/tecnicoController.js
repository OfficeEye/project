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
        tecnicoModel.tecnicoCadastrarMaquina(nomeMaquina, modeloMaquina, idFuncionario, fkEmpresa).then(
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

function buscarChamadosPendentes(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.buscarChamadosPendentes(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado)
            }
        ).catch(
            function (erro) {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            }
        );
    }
}

function validarChamado(req, res) {
    var nivelPrioridade = req.body.nivelPrioridadeServer;
    var idChamado = req.body.idChamadoServer;
    var fkUsuario = req.body.fkUsuarioServer;

    if (nivelPrioridade == undefined) {
        res.status(400).send("O nivel de prioridade está undefined!");
    } else if (idChamado == undefined) {
        res.status(400).send("O id do chamado está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("A fk do funcionário está undefined!");
    }else{
        tecnicoModel.validarChamado(nivelPrioridade, idChamado, fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                    return resultado;
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao validar o chamado! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function removerChamado(req, res) {
    var idChamado = req.body.idChamadoServer;
    var fkUsuario = req.body.fkUsuarioServer;

   if (idChamado == undefined) {
        res.status(400).send("O id do chamado está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("A fk do funcionário está undefined!");
    }else{
        tecnicoModel.removerChamado(idChamado, fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                    return resultado;
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao remover o chamado! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarQuantidadeDeAlertas(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var dataSelecionada = req.params.dataSelecionada;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.buscarQuantidadeDeAlertas(fkEmpresa, dataSelecionada)
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

function buscarQuantidadeDeMaquinasEmAlerta(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    
    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.buscarQuantidadeDeMaquinasEmAlerta(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado)
            }
        ).catch(
            function (erro) {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            }
        );
    }
}


function buscarQtdChamadosAbertos(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    
    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.buscarQtdChamadosAbertos(fkEmpresa)
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


function buscarQtdMaquinasTotal(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    
    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.buscarQtdMaquinasTotal(fkEmpresa)
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

function buscarNovosChamados(req, res){
    var fkEmpresa = req.params.fkEmpresa;
    
    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.buscarNovosChamados(fkEmpresa)
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


module.exports = {
    tecnicoCadastrarMaquina,
    getDadosMaquina,
    buscarChamadosPendentes,
    validarChamado,
    removerChamado,
    buscarQuantidadeDeAlertas,
    buscarQuantidadeDeMaquinasEmAlerta,
    buscarQtdChamadosAbertos,
    buscarQtdMaquinasTotal,
    buscarNovosChamados
}