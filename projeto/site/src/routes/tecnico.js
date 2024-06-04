var express = require("express");
var router = express.Router();

var tecnicoController = require("../controllers/tecnicoController");

router.post("/tecnicoCadastrarMaquina", function (req, res) {
    tecnicoController.tecnicoCadastrarMaquina(req, res);
});

router.post("/getDadosMaquina", function (req, res) {
    tecnicoController.getDadosMaquina(req, res);
});

router.post("/cadastrarEspecificacaoMaquina", function (req, res) {
    tecnicoController.cadastrarEspecificacaoMaquina(req, res);
});

router.post("/getUltimoIDFuncionario", function (req, res) {
    tecnicoController.getUltimoIDFuncionario(req, res);
});

router.post("/getUltimoStatusRegistroEspacoDisponivel", function (req, res) {
    tecnicoController.getUltimoStatusRegistroEspacoDisponivel(req, res);
});

router.post("/getUltimoStatusRegistroMemoriaUso", function (req, res) {
    tecnicoController.getUltimoStatusRegistroMemoriaUso(req, res);
});

router.post("/getMaquinaAlerta", function (req, res) {
    tecnicoController.getMaquinaAlerta(req, res);
});

module.exports = router;