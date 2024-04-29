function returnIndex() {
    window.location.href = "../index.html";
}
function openModal(){
    modal.classList.add("active");
    textoModal.innerHTML = "Tem certeza que deseja sair?"

}
function closeModal(){
    modal.classList.remove("active");
}

function returnCadastrarUsuario() {
    window.location.href = "cadastro-gestor.html"
}

function returnDash() {
    window.location.href = "dashboard-gestor.html"
}