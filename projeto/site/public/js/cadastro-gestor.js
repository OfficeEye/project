function getNameUser() {
    const user = sessionStorage.NOME_FANTASIA_EMPRESA
    nomeUser.innerHTML = `Bem vindo, ${user}`
}

function cadastrarUser() {
    window.location.href = "gerente-cadastra/usuario-cadastro.html"
}

function returnIndex() {
    window.location.href = "../index.html";
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