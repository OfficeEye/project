const modalRequest = document.querySelector('#modalRequest')
const modalSair = document.querySelector('#modalSair')
const modalRemover = document.querySelector('#modalRemover')
const modalEditar = document.querySelector('#modalEditar')
const modalBackground = document.querySelector('#modalBackground')

function openModal(texto) {
    modalSair.classList.add('active')
    modalBackground.classList.add('active')
}

function closeModal() {
    modalSair.classList.remove('active')
    modalBackground.classList.remove('active')
}

function returnIndex() {
    window.location.href = '../index.html'
}

function returnCadastrarUsuario() {
    window.location.href = 'cadastro-gestor.html'
}

function returnDash() {
    window.location.href = 'tabela-chamados.html'
}

function removerChamado() {
    modalRemover.classList.add('active')
    modalBackground.classList.add('active')
}

function editarChamado() {
    modalEditar.classList.add('active')
    modalBackground.classList.add('active')
}

function confirmarRemocao() {
    
}

function confirmarEdicao() {
    
}

function abrirFormulario() {
    modalBackground.classList.add('active')
    modalRequest.classList.add('active')
}

function fecharDeus() {
    modalBackground.classList.remove('active')
}

function salvarFormulario() {
    modalRequest.classList.remove('active')
    modalBackground.classList.remove('active')
}

function fecharFormulario() {
    modalRequest.classList.remove('active')
    modalBackground.classList.remove('active')
}
