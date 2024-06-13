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

router.post("/getNomeEmpresa", function (req, res) {
    gestorController.getNomeEmpresa(req, res);
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

router.post("/getDadosFuncionarioEditavel", function (req, res) {
    gestorController.getDadosFuncionarioEditavel(req, res);
});

router.post("/editarInformacoesFuncionario", function (req, res) {
    gestorController.editarInformacoesFuncionario(req, res);
});

router.post("/excluirContaFuncionario", function (req, res) {
    gestorController.excluirContaFuncionario(req, res);
});

router.post("/pegarDadosGrafico1", function (req, res) {
    console.log("Rota pegarDadosGrafico1");
    // console.log(req);
    // console.log(req.body);
    gestorController.pegarDadosGrafico1(req, res);
});

router.post("/pegarDadosGrafico2", function (req, res) {
    console.log("Rota pegarDadosGrafico2");
    gestorController.pegarDadosGrafico2(req, res);
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

router.delete("/confirmarRemocao", function (req, res) {
    gestorController.confirmarRemocao(req, res);
});

router.put("/confirmarEdicao", function (req, res) {
    gestorController.confirmarEdicao(req, res);
});


module.exports = router;