function returnIndex() {
    window.location.href = "../index.html";
}
function openModal(texto){
    modalSair.classList.add("active");

}
function closeModal(){
    modalSair.classList.remove("active");
    modalRemover.classList.remove("active");
    modalEditar.classList.remove("active");
}

function returnCadastrarUsuario() {
    window.location.href = "cadastro-gestor.html"
}

function returnDash() {
    window.location.href = "dashboard-gestor.html"
}

function removerMaquina() {
    modalRemover.classList.add("active");
}

function editarMaquina() {
    modalEditar.classList.add("active");
}

function confirmarRemocao(){
    
}