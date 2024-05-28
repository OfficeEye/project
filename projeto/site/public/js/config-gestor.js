function returnDash() {
    window.location.href = "dashboard-gestor.html"
}
function returnCadastrarUsuario() {
    window.location.href = "cadastro-gestor.html"
}
function openModal(){
    modal.classList.add("active");
    modalBackground.classList.add("active");

}
function closeModal(){
    modal.classList.remove("active");
    modalBackground.classList.remove("active");
}
function returnConfig() {
    window.location.href = "config-gestor.html"
}
function buscarInformacoesUsuario() {
    var idUsuario = localStorage.ID_USUARIO;

    fetch("/gestor/buscarInformacoesUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: idUsuario
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (usuario) {
                console.log(usuario);
            })
        }else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}