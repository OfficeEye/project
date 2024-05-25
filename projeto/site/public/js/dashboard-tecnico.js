

const modalBackground = document.getElementById('modalBackground');
const modalSair = document.getElementById('modalSair');


function returnTabelaMaquinas(){
    window.location.href = "../dashboards/tabela-maquinas.html";
}

function returnChamados(){
    window.location.href = "../dashboards/tabela-chamados.html";
}

function openModal(){
    console.log(modalBackground, modalSair); // Isso mostrará os elementos no console
    modalBackground.classList.add("active");
    modalSair.classList.add("active");
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
    window.location.href = "../dashboards/dashboard-tecnico.html";
}

