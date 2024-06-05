var gestorModel = require("../models/gestorModel");

function gestorCadastrarUsuario(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var permision = req.body.permisionServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!")
    }else if (email == undefined) {
        res.status(400).send("Seu email está undefined!")
    }else if (cpf == undefined) {
        res.status(400).send("seu CPF está undefined!")
    }else if (permision == undefined) {
        res.status(400).send("Sua permissão está undefined!")
    }else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!")
    }else if(fkEmpresa == undefined){
        res.status(400).send("Sua empresa está undefined!")
    }else {
        gestorModel.cadastrarUsuario(nome, cpf, email, permision, senha, fkEmpresa).then(
            function (resultados) {
                res.json(resultados);
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
        )
    }    
}
function gestorCadastrarFuncionario(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var cargo = req.body.cargoServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!")
    }else if (email == undefined) {
        res.status(400).send("Seu email está undefined!")
    }else if (cpf == undefined) {
        res.status(400).send("seu CPF está undefined!")
    }else if(cargo == undefined) {
        res.status(400).send("Seu cargo está undefined!")
    }else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!")
    }else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!")
    }else {
        gestorModel.gestorCadastrarFuncionario(nome, email, cpf, cargo, senha, fkEmpresa).then(
            function (resultados) {
                res.json(resultados);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro de Funcionario! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function buscarInformacoesUsuario (req, res) {
    var idUsuario = req.body.idUsuarioServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        gestorModel.buscarInformacoesUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length == 1){
                    res.json(resultado[0])
                } else if (resultado.length == 0) {
                    res.status(403).send("idUsuario inválido(s)");
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

function editarInformacoesUsuario(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    }else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!")
    }else if (email == undefined) {
        res.status(400).send("Seu email está undefined!")
    }else if (cpf == undefined) {
        res.status(400).send("seu CPF está undefined!")
    }else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!")
    } else {
        gestorModel.editarInformacoesUsuario(idUsuario, nome, email, cpf, senha)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            }
        );
    }
}

function excluirContaUsuario(req, res) {
    var idUsuario = req.body.idUsuarioServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    }else {
        gestorModel.excluirContaUsuario(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            }
        );
    }
}

function getDadosFuncionario(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        gestorModel.getDadosFuncionario(fkEmpresa)
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

function pegarDadosGrafico1(req, res){
    let fkEmpresa = req.body.fkEmpresa;

    console.log('Cheguei no controller')

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        gestorModel.pegarDadosGrafico1(fkEmpresa)
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

function pegarDadosGrafico2(req, res){
    let fkEmpresa = req.body.fkEmpresa;


    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        gestorModel.pegarDadosGrafico2(fkEmpresa)
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


function contarComputadoresEmAlerta(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        gestorModel.contarComputadoresEmAlerta(fkEmpresa)
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

function contarChamadosPrioritariosAbertos(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        gestorModel.contarChamadosPrioritariosAbertos(fkEmpresa)
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

function contarAlertasMaisTempo(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        gestorModel.contarAlertasMaisTempo(fkEmpresa)
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
    gestorCadastrarUsuario,
    gestorCadastrarFuncionario,
    buscarInformacoesUsuario,
    editarInformacoesUsuario,
    excluirContaUsuario,
    getDadosFuncionario
}