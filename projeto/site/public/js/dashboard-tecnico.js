function returnTabelaMaquinas(){
    window.location.href = "../dashboards/tabela-maquinas.html";
}

function returnChamados(){
    window.location.href = "../dashboards/tabela-chamados.html";
}

function openModal(texto){
    modalSair.classList.add("active");

}

function closeModal(){
    modalSair.classList.remove("active");
   
}

function returnIndex() {
    window.location.href = "../index.html";
}

function returnDashboard() {
    window.location.href = "../dashboards/dashboard-tecnico.html";
}