

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
    localStorage.removeItem('ID_USUARIO')
    localStorage.removeItem('EMPRESA_USUARIO')
    localStorage.removeItem('TIPO_USUARIO')
    localStorage.removeItem('NOME_USUARIO')
    window.location.href = '../login.html'
}

function returnCadastrarUsuario() {
    window.location.href = 'cadastro-gestor.html'
}

function returnDash() {
    window.location.href = 'tabela-chamados.html'
}

function returnNewChamado(){
    window.location.href = 'new-chamados.html'
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

function abrirFormulario(idChamado) {
    modalBackground.classList.add('active')
    modalRequest.classList.add('active')
    exibirDadosDoChamado(idChamado)
    
}

function exibirDadosDoChamado(idChamado) {
    fetch(`/tecnico/exibirDadosDoChamado/${idChamado}`, { cache: 'no-store' }).then(function (response) {
        response.json().then(function (resposta) {
            console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);

            var idChamado = document.getElementById('id_chamado_form')
            var responsavel = document.getElementById('responsavel_form')
            var prioridade = document.getElementById('prioridade_form')
            var status = document.getElementById('status_form')
            var solicitante = document.getElementById('solicitante_form')
            var idMaquina = document.getElementById('idMaquina_form')

            var msgMaquina = resposta[0].idMaquina
            if(resposta[0].idMaquina == null) {
                msgMaquina = "Sem máquina..."
            }

            idChamado.innerHTML = `#${resposta[0].idChamado}`
            responsavel.innerHTML = `${resposta[0].nome}`
            prioridade.innerHTML = `${resposta[0].prioridade}`
            status.innerHTML = `${resposta[0].status}`
            solicitante.innerHTML = `${resposta[0].email}`
            idMaquina.innerHTML = `${msgMaquina}`
        });
    }) 
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
    // setTimeout(function() {
    //     tbodyRefrigerador.innerHTML = ``
    //     exibirChamadosPendentesDeAprovacao(fkEmpresa)
    //   }, 10000);
}

function buscarChamadosAbertos() {
    var fkEmpresa = localStorage.getItem('EMPRESA_USUARIO')

    fetch(`/tecnico/buscarChamadosAbertos/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        response.json().then(function (resposta) {
            console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);
            
            for (var i = 0; i < resposta.length; i++) {

                var classPriority = '';
                if (resposta[i].prioridade == 'baixa') {
                    classPriority = 'priority-baixa'
                }else if (resposta[i].prioridade == 'media') {
                    classPriority = 'priority-media'
                }else if (resposta[i].prioridade == 'alta') {
                    classPriority = 'priority-alta'
                }

                card_chamado_aberto.innerHTML += `
                    <div class="content1">
                            <div class="list-1">
                                <div class="request" onclick="abrirFormulario(${resposta[i].idChamado})">
                                    <div class="line-1">
                                        <div class="container-1">
                                            <span class="number-request">#${resposta[i].idChamado}</span>
                                            <div class="priority ${classPriority}"></div>
                                        </div>
                                        <div class="container-2">
                                            <select name="" id="" class="select-status">
                                                <option value="ABERTO" selected>${resposta[i].status}</option>
                                                <option value="EM_ANDAMENTO">Em Andamento</option>
                                                <option value="CONCLUIDO">Concluído</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="line-2">
                                        <span class="description-request">${resposta[i].mensagem}</span>
                                    </div>
                                    <div class="line-3">
                                        <h3>Responsável:</h3>
                                        <span>${resposta[i].nome}</span>
                                    </div>
                                    <div class="line-4">
                                        <span class="date">${resposta[i].dataAberturaFormatada}</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                `
            }
        });
    })
    
}
