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

function cadastrarUser() {
    window.location.href = "gerente-cadastra/usuario-cadastro.html"
}

function returnIndex() {
    window.location.href = "../login.html";
}
function openModal(texto){
    modalSair.classList.add("active");
    modalBackground.classList.add("active");
}
function closeModal(){
    modalSair.classList.remove("active");
    modalRemover.classList.remove("active");
    modalEditar.classList.remove("active");
    modalBackground.classList.remove("active");
}

function returnCadastrarUsuario() {
    window.location.href = "cadastro-gestor.html"    
}

function returnDash() {
    window.location.href = "dashboard-gestor.html"
}

function removerMaquina() {
    modalRemover.classList.add("active");
    modalBackground.classList.add("active");
}

function editarMaquina() {
    modalEditar.classList.add("active");
    modalBackground.classList.add("active");
}

function confirmarRemocao(){

}

function confirmarEdicao(){
}