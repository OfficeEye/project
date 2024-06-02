var express = require("express");
var router = express.Router();

var tecnicoController = require("../controllers/tecnicoController");

router.post("/tecnicoCadastrarMaquina", function (req, res) {
    tecnicoController.tecnicoCadastrarMaquina(req, res);
});

router.post("/getDadosMaquina", function (req, res) {
    tecnicoController.getDadosMaquina(req, res);
});

router.get("/buscarChamadosPendentes/:fkEmpresa", function (req, res) {
    tecnicoController.buscarChamadosPendentes(req, res);
});

router.post("/validarChamado", function (req, res) {
    tecnicoController.validarChamado(req, res);
});

router.post("/removerChamado", function (req, res) {
    tecnicoController.removerChamado(req, res);
});

router.get("/buscarQuantidadeDeAlertasPorComponente/:fkEmpresa/:dataSelecionada", function (req, res) {
    tecnicoController.buscarQuantidadeDeAlertas(req, res);
});



module.exports = router;