function validarSessao() {
    var nome = localStorage.NOME_USUARIO;
    var empresa = localStorage.EMPRESA_USUARIO

    if(nome == null && empresa == null) {
        window.location = "../login.html"
    }
}
function getNameUser() {
    const user = localStorage.NOME_USUARIO;
    nomeUser.innerHTML = `Bem vindo, ${user}`
}
function logout() {
    localStorage.removeItem('EMPRESA_USUARIO')
    localStorage.removeItem('TIPO_USUARIO')
    localStorage.removeItem('NOME_USUARIO')

    setTimeout(function () {
        window.location = "../login.html";
    }, 300); // apenas para exibir o loading

}
function returnIndex() {
    window.location.href = "../login.html";
}
function openModal(){
    modal.classList.add("active");
    modalBackground.classList.add("active");

}
function closeModal(){
    modal.classList.remove("active");
    modalBackground.classList.remove("active");
}

function returnCadastrarUsuario() {
    window.location.href = "cadastro-gestor.html"
}

function returnDash() {
    window.location.href = "dashboard-gestor.html"
}