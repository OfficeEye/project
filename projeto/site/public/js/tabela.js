function returnTabelaMaquinas(){
    window.location.href = "../dashboard-tecnico/tabela-maquinas.html";
}

function returnChamados(){
    window.location.href = "../dashboard-tecnico/tabela-chamados.html";
}

function openModal(){
    modalBackground.classList.add("active");
    modalSair.classList.add("active");
    
}

function closeModal(){
    modalSair.classList.remove("active");
    modalBackground.classList.remove("active");
}

function returnIndex() {
    localStorage.removeItem('ID_USUARIO')
    localStorage.removeItem('EMPRESA_USUARIO')
    localStorage.removeItem('TIPO_USUARIO')
    localStorage.removeItem('NOME_USUARIO')
    window.location.href = "../login.html";
}

function returnDashboard() {
    window.location.href = "../dashboard-tecnico/dashboard-tecnico.html";
}