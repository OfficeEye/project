function openModal(texto){
    modalSair.classList.add("active");
    modalBackground.classList.add("active");
}
function returnIndex() {
    window.location.href = "../index.html";
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
    window.location.href = "tabela-chamados.html"
}

function removerChamado() {
    modalRemover.classList.add("active");
    modalBackground.classList.add("active");
}

function editarChamado() {
    modalEditar.classList.add("active");
    modalBackground.classList.add("active");
}

function confirmarRemocao(){

}

function confirmarEdicao(){
}