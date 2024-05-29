

const modalBackground = document.getElementById('modalBackground');
const modalSair = document.getElementById('modalSair');


function returnTabelaMaquinas(){
    window.location.href = "../dashboard-tecnico/tabela-maquinas.html";
}

function returnChamados(){
    window.location.href = "../dashboard-tecnico/tabela-chamados.html";
}

function openModal(texto){
    modalSair.classList.add("active");
    modalBackground.classList.add("active");
}

function closeModal(){
    console.log(modalSair.classList); // Isso mostrará as classes do modalSair no console
    modalSair.classList.remove("active");
    modalBackground.classList.remove("active");
}

function returnIndex() {
    window.location.href = "../login.html";
}

function returnDashboard() {
    window.location.href = "../dashboard-tecnico/dashboard-tecnico.html";
}

