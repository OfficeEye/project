var express = require("express");
var router = express.Router();

var gestorController = require("../controllers/gestorController");

router.post("/gestorCadastrarUsuario", function (req, res) {
    gestorController.gestorCadastrarUsuario(req, res);
});

router.post("/gestorCadastrarFuncionario", function (req, res) {
    gestorController.gestorCadastrarFuncionario(req, res);
});

router.post("/buscarInformacoesUsuario", function (req, res) {
    gestorController.buscarInformacoesUsuario(req, res);
});

module.exports = router;