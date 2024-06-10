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
    let fkEspecificacaoTamanhoTotalDisco = req.body.fkEspecificacaoTamanhoTotalDiscoServer;
    let fkEspecificacaoMemoriaTotalRam = req.body.fkEspecificacaoMemoriaTotalRamServer;
    let fkEspecificacaoFrequenciaCpu = req.body.fkEspecificacaoFrequenciaCpuServer;

    if (idFuncionario == undefined) {
        res.status(400).send("seu idFuncionario está undefined!")
    }else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!")
    }else if(fkMaquina == undefined) {
        res.status(400).send("Sua fkMaquina está undefined!")
    }else {
        

        tecnicoModel.cadastrarEspecificacaoDisco(fkMaquina, fkEmpresa, idFuncionario, fkEspecificacaoTamanhoTotalDisco).then(
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

        tecnicoModel.cadastrarEspecificacaoMemoria(fkMaquina, fkEmpresa, idFuncionario, fkEspecificacaoMemoriaTotalRam).then(
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

        tecnicoModel.cadastrarEspecificacaoCPU(fkMaquina, fkEmpresa, idFuncionario, fkEspecificacaoFrequenciaCpu).then(
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

function cadastrarMetricaMaquina(req, res) {
    let fkEmpresa = req.body.fkEmpresaServer;
    let fkFuncionario = req.body.fkFuncionarioServer;
    let fkMaquina = req.body.fkMaquinaServer;
    let fkEspecificacaoTamanhoTotalDisco = req.body.fkEspecificacaoTamanhoTotalDiscoServer;
    let fkEspecificacaoMemoriaTotalRam = req.body.fkEspecificacaoMemoriaTotalRamServer;
    let fkEspecificacaoFrequenciaCpu = req.body.fkEspecificacaoFrequenciaCpuServer;
    let fkComponenteDisco = req.body.fkComponenteDiscoServer;
    let fkComponenteMemoria = req.body.fkComponenteMemoriaServer;
    let fkComponenteCpu = req.body.fkComponenteCpuServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if (fkFuncionario == undefined) {
        res.status(400).send("Seu fkFuncionario está undefined!");
    } else if (fkMaquina == undefined) {
        res.status(400).send("Seu fkMaquina está undefined!");
    } else if (fkEspecificacaoTamanhoTotalDisco == undefined) {
        res.status(400).send("Seu fkEspecificacaoTamanhoTotalDisco está undefined!");
    } else if (fkEspecificacaoMemoriaTotalRam == undefined) {
        res.status(400).send("Seu fkEspecificacaoMemoriaTotalRam está undefined!");
    } else if (fkEspecificacaoFrequenciaCpu == undefined) {
        res.status(400).send("Seu fkEspecificacaoFrequenciaCpu está undefined!");
    } else if (fkComponenteDisco == undefined) {
        res.status(400).send("Seu fkComponenteDisco está undefined!");
    } else if (fkComponenteMemoria == undefined) {
        res.status(400).send("Seu fkComponenteMemoria está undefined!");
    } else if (fkComponenteCpu == undefined) {
        res.status(400).send("Seu fkComponenteCpu está undefined!");
    } else {
        tecnicoModel.cadastrarMetricaMaquinaEspaçoDisponivel(fkEmpresa, fkFuncionario, fkMaquina, fkEspecificacaoTamanhoTotalDisco, fkComponenteDisco)
        .then(
            function (resultado) {
                if (resultado.length >= 1){
                    res.json(resultado)
                } else if (resultado.length == 0) {
                    res.status(403).send("fkEspecificacao inválido(s)");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            }
        );
        tecnicoModel.cadastrarMetricaMaquinaMemoriaUso(fkEmpresa, fkFuncionario, fkMaquina, fkEspecificacaoMemoriaTotalRam, fkComponenteMemoria)
        .then(
            function (resultado) {
                if (resultado.length >= 1){
                    res.json(resultado)
                } else if (resultado.length == 0) {
                    res.status(403).send("fkEspecificacao inválido(s)");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            }
        );
        tecnicoModel.cadastrarMetricaMaquinaUsoProcessador(fkEmpresa, fkFuncionario, fkMaquina, fkEspecificacaoFrequenciaCpu, fkComponenteCpu)
        .then(
            function (resultado) {
                if (resultado.length >= 1){
                    res.json(resultado)
                } else if (resultado.length == 0) {
                    res.status(403).send("fkEspecificacao inválido(s)");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            }
        );
        tecnicoModel.cadastrarMetricaMaquinaTemperaturaCpu(fkEmpresa, fkFuncionario, fkMaquina, fkEspecificacaoFrequenciaCpu, fkComponenteCpu)
        .then(
            function (resultado) {
                if (resultado.length >= 1){
                    res.json(resultado)
                } else if (resultado.length == 0) {
                    res.status(403).send("fkEspecificacao inválido(s)");
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

function getUltimoEspecificacaoMaquinaCadastrada(req, res) {
    tecnicoModel.getUltimoEspecificacaoMaquinaCadastrada()
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

function getUltimoIDFuncionario(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    
    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.getUltimoIDFuncionario(fkEmpresa)
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

function getUltimosRegistroComponentes(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;
    var idFuncionario = req.body.idFuncionarioServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEpresa está undefined!");
    } else if (idFuncionario == undefined) {
        res.status(400).send("Seu idFuncionario está undefined!")
    } else {
        tecnicoModel.getUltimosRegistroComponentes(fkEmpresa, idFuncionario)
        .then(
            function (resultado) {
                res.json(resultado)
            }
        ).catch(
            function (erro) {
                console.lod(erro)
                res.status(500).json(erro.sqlMessage)
            }
        )
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

function buscarChamadosAbertos(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    
    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.buscarChamadosAbertos(fkEmpresa)
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

function exibirDadosDoChamado(req, res) {
    var idChamado = req.params.idChamado;
    
    if (idChamado == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.exibirDadosDoChamado(idChamado)
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

function mudarStatusChamado(req, res) {
    var statusSelecionado = req.body.statusSelecionadoServer;
    var idChamado = req.body.idChamadoServer;
    var dataFechamento = req.body.dataFechamentoServer;

   
        tecnicoModel.mudarStatusChamado(statusSelecionado, idChamado, dataFechamento)
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


function buscarInformacoesChamado(req, res) {
    var idChamado = req.params.idChamado;
    
    if (idChamado == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.buscarInformacoesChamado(idChamado)
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


function buscarInformacoesHistorico(req, res) {
    var idChamado = req.params.idChamado;
    
    if (idChamado == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.buscarInformacoesHistorico(idChamado)
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

function salvarHistoricoChamado(req, res) {
    var idChamado= req.body.idChamadoServer;
    var descricaoProblema = req.body.descricaoProblemaServer;
    var descricaoSolucao = req.body.descricaoSolucaoServer;
    var idFuncionario = req.body.idFuncionarioServer;
    var idUsuario = req.body.idUsuarioServer;
    var idMaquina = req.body.idMaquinaServer;
    var fkEmpresa = req.body.fkEmpresaServer

   
        tecnicoModel.salvarHistoricoChamado(idChamado, descricaoProblema, descricaoSolucao, idFuncionario, idUsuario, idMaquina, fkEmpresa)
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

function atualizarHistoricoChamado(req, res) {
    var idChamado= req.body.idChamadoServer;
    var descricaoProblema = req.body.descricaoProblemaServer;
    var descricaoSolucao = req.body.descricaoSolucaoServer;
   
   
        tecnicoModel.atualizarHistoricoChamado(idChamado, descricaoProblema, descricaoSolucao)
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

function verificarSeExisteHistorico(req, res) {
    var idChamado = req.params.idChamado;
    
    if (idChamado == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        tecnicoModel.verificarSeExisteHistorico(idChamado)
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


module.exports = {
    tecnicoCadastrarMaquina,
    cadastrarEspecificacaoMaquina,
    getUltimoIDFuncionario,
    getUltimoStatusRegistro,
    getUltimosRegistroComponentes,
    cadastrarMetricaMaquina,
    getDadosMaquina,
    getUltimoEspecificacaoMaquinaCadastrada,
    buscarChamadosPendentes,
    validarChamado,
    removerChamado,
    buscarQuantidadeDeAlertas,
    buscarQuantidadeDeMaquinasEmAlerta,
    buscarQtdChamadosAbertos,
    buscarQtdMaquinasTotal,
    buscarChamadosAbertos,
    exibirDadosDoChamado,
    exibirDadosDoChamado,
    mudarStatusChamado,
    buscarInformacoesChamado,
    buscarInformacoesHistorico,
    salvarHistoricoChamado,
    atualizarHistoricoChamado,
    verificarSeExisteHistorico,
}