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

router.put("/editarInformacoesUsuario", function (req, res) {
    gestorController.editarInformacoesUsuario(req, res);
});

router.delete("/excluirContaUsuario", function (req, res) {
    gestorController.excluirContaUsuario(req, res);
});

router.post("/getDadosFuncionario", function (req, res) {
    gestorController.getDadosFuncionario(req, res);
});

router.post("/contarComputadoresEmAlerta", function (req, res) {
    gestorController.contarComputadoresEmAlerta(req, res);
});

router.post("/contarChamadosPrioritariosAbertos", function (req, res) {
    gestorController.contarChamadosPrioritariosAbertos(req, res);
});

router.post("/contarAlertasMaisTempo", function (req, res) {
    gestorController.contarAlertasMaisTempo(req, res);
});

module.exports = router;