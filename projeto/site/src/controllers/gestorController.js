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

module.exports = {
    gestorCadastrarUsuario,
    gestorCadastrarFuncionario
}