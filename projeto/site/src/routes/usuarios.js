var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/logar", function (req, res) {
    usuarioController.logar(req, res);
});

router.post("/existeEmpresa", function (req, res) {
    usuarioController.existeEmpresa(req, res);
});

router.post("/ultimaEmpresaCadastrada", function (req, res) {
    usuarioController.ultimaEmpresaCadastrada(req, res);
});

router.post("/gestorCadastrarUsuario", function (req, res) {
    usuarioController.gestorCadastrarUsuario(req, res);
});

router.post("/gestorCadastrarFuncionario", function (req, res) {
    usuarioController.gestorCadastrarFuncionario(req, res);
})

module.exports = router;