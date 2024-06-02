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

function removerChamado(idChamado) {
    modalRemover.classList.add('active')
    modalBackground.classList.add('active')
    sessionStorage.ID_CHAMADO = idChamado;
}

function editarChamado(idChamado) {
    modalEditar.classList.add('active')
    modalBackground.classList.add('active')
    sessionStorage.ID_CHAMADO = idChamado;
}

function confirmarRemocao() {
    var idChamado = sessionStorage.getItem('ID_CHAMADO')
    var fkUsuario = localStorage.getItem('ID_USUARIO')

    fetch("/tecnico/removerChamado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idChamadoServer: idChamado,
            fkUsuarioServer: fkUsuario
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            setTimeout(function() {
                window.location.reload();
              }, 2000);
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}

function confirmarEdicao() {
    var nivelPrioridade = nivel_prioridade.value
    var idChamado = sessionStorage.getItem('ID_CHAMADO')
    var fkUsuario = localStorage.getItem('ID_USUARIO')

    fetch("/tecnico/validarChamado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nivelPrioridadeServer: nivelPrioridade,
            idChamadoServer: idChamado,
            fkUsuarioServer: fkUsuario
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            setTimeout(function() {
                window.location.reload();
              }, 2000);
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
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

function exibirChamadosPendentesDeAprovacao(fkEmpresa) {

    fetch(`/tecnico/buscarChamadosPendentes/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        response.json().then(function (resposta) {
            console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);

            for(var i = 0; i < resposta.length; i++) {

                tbodyRefrigerador.innerHTML += `
                
                    <tr>
                        <td class="td-numero">${resposta[i].idChamado}</td>
                        <td class="td-data">${resposta[i].data}</td>
                        <td class="td-aberto-por">${resposta[i].email}</td>
                        <td class="td-mensagem" style="width: 30%">${resposta[i].mensagem}</td>
                        <td class="container-img">
                            <img class="btn-editar" src="../assets/svg/White_check.svg" onclick="editarChamado(${resposta[i].idChamado})">
                            <img class="btn-excluir" src="../assets/svg/x.svg" onclick="removerChamado(${resposta[i].idChamado})">
                        </td>
                    </tr>
                
                `
            }
        });
    })
    setTimeout(function() {
        exibirChamadosPendentesDeAprovacao(fkEmpresa)
      }, 10000);
}