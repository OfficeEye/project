
const modalRequest = document.querySelector('#modalRequest')
const modalSair = document.querySelector('#modalSair')
const modalRemover = document.querySelector('#modalRemover')
const modalEditar = document.querySelector('#modalEditar')
const modalBackground = document.querySelector('#modalBackground')


const id_Chamado = document.getElementById('id_chamado_form')
const responsavel = document.getElementById('responsavel_form')
const prioridade = document.getElementById('prioridade_form')
const status = document.getElementById('status_form')
const solicitante = document.getElementById('solicitante_form')
const idMaquina = document.getElementById('idMaquina_form')
const descricaoProblema = document.getElementById('descricao_problema')
const descricaoSolucao = document.getElementById('descricao_solucao')
const buttons = document.getElementById('buttons')


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

function returnNewChamado() {
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
            setTimeout(function () {
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
            setTimeout(function () {
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

            if (resposta[0].status != 'EM_ANDAMENTO') {
                descricaoProblema.disabled = true
                descricaoProblema.style.opacity = '20%'
                descricaoSolucao.disabled = true
                descricaoSolucao.style.opacity = '20%'

            } else {
                descricaoProblema.disabled = false
                descricaoProblema.style.opacity = '100%'
                descricaoSolucao.disabled = false
                descricaoSolucao.style.opacity = '100%'
            }

            var msgMaquina = resposta[0].idMaquina
            if (resposta[0].idMaquina == null) {
                msgMaquina = "Sem máquina..."
            }

            var statusFormat = ``;

            if (resposta[0].status == 'ABERTO') {
                statusFormat = `Aberto`
            } else if (resposta[0].status == 'EM_ANDAMENTO') {
                statusFormat = `Em Andamento`
            }else {
                statusFormat = `Concluído`
            }

            id_Chamado.innerHTML = `#${resposta[0].idChamado}`
            responsavel.innerHTML = `${resposta[0].nome}`
            prioridade.innerHTML = `${resposta[0].prioridade}`
            status.innerHTML = `${statusFormat}`
            solicitante.innerHTML = `${resposta[0].email}`
            idMaquina.innerHTML = `${msgMaquina}`
            descricaoProblema.value = `${resposta[0].descricaoProblema == null ? `` : resposta[0].descricaoProblema}`
            descricaoSolucao.value = `${resposta[0].descricaoSolucao == null ? `` : resposta[0].descricaoSolucao}`

            buttons.innerHTML = `
                <button class="btn-salvar" onclick="salvarFormulario(${resposta[0].idChamado}, ${resposta[0].idFuncionario}, ${resposta[0].idUsuario}, ${resposta[0].idMaquina}, ${resposta[0].fkEmpresa})">Salvar</button>
                <button class="btn-cancelar" onclick="fecharFormulario()">Cancelar</button>
            `
        });
    })
}

function fecharDeus() {
    modalBackground.classList.remove('active')
}

async function salvarFormulario(idChamado, idFuncionario, idUsuario, idMaquina, fkEmpresa) {
    modalRequest.classList.remove('active')
    modalBackground.classList.remove('active')

    var idChamadoVar = idChamado
    var descricaoProblemaVar = descricaoProblema.value
    var descricaoSolucaoVar = descricaoSolucao.value
    var idFuncionarioVar = idFuncionario
    var idUsuarioVar = idUsuario
    var idMaquinaVar = idMaquina
    var fkEmpresaVar = fkEmpresa

    try {
        var resposta = await verificarSeExisteHistorico(idChamado);

        if (resposta.length < 1) {

            fetch("/tecnico/salvarHistoricoChamado", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idChamadoServer: idChamadoVar,
                    descricaoProblemaServer: descricaoProblemaVar,
                    descricaoSolucaoServer: descricaoSolucaoVar,
                    idFuncionarioServer: idFuncionarioVar,
                    idUsuarioServer: idUsuarioVar,
                    idMaquinaServer: idMaquinaVar,
                    fkEmpresaServer: fkEmpresaVar
                }),
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
        } else {

            fetch("/tecnico/atualizarHistoricoChamado", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idChamadoServer: idChamadoVar,
                    descricaoProblemaServer: descricaoProblemaVar,
                    descricaoSolucaoServer: descricaoSolucaoVar,
                }),
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
        }
    } catch (error) {
        console.error('Erro ao verificar informações do histórico:', error);
    }


}

function fecharFormulario() {
    modalRequest.classList.remove('active')
    modalBackground.classList.remove('active')
    id_Chamado.innerHTML = ``
    responsavel.innerHTML = ``
    prioridade.innerHTML = ``
    status.innerHTML = ``
    solicitante.innerHTML = ``
    idMaquina.innerHTML = ``

}

function exibirChamadosPendentesDeAprovacao(fkEmpresa) {

    fetch(`/tecnico/buscarChamadosPendentes/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        response.json().then(function (resposta) {
            console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);

            for (var i = 0; i < resposta.length; i++) {

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
                } else if (resposta[i].prioridade == 'media') {
                    classPriority = 'priority-media'
                } else if (resposta[i].prioridade == 'alta') {
                    classPriority = 'priority-alta'
                }

                var statusFormat = ``;

                if (resposta[i].status == 'ABERTO') {
                    statusFormat = `Aberto`
                } else if (resposta[i].status == 'EM_ANDAMENTO') {
                    statusFormat = `Em Andamento`
                } else {
                    statusFormat = `Concluído`
                }

                card_chamado_aberto.innerHTML += `
                    <div class="content1">
                            <div class="list-1">
                                <div class="request">
                                    <div class="line-1">
                                        <div class="container-1" onclick="abrirFormulario(${resposta[i].idChamado})">
                                            <span class="number-request">#${resposta[i].idChamado}</span>
                                            <div class="priority ${classPriority}"></div>
                                        </div>
                                        <div class="container-2">
                                        ${statusFormat == 'Concluído' ?
                        `
                                        <select disabled name="" id="" class="select-status" onchange="verificarStatusSelecionado(this, ${resposta[i].idChamado})">
                                            <option value="CONCLUIDO">Concluído</option>
                                        </select>
                                        `
                        :
                        `
                                        <select name="" id="" class="select-status" onchange="verificarStatusSelecionado(this, ${resposta[i].idChamado})">
                                            <option value="ABERTO" ${statusFormat == 'Aberto' ? 'selected' : ''}>Aberto</option>
                                            <option value="EM_ANDAMENTO" ${statusFormat == 'Em Andamento' ? 'selected' : ''}>Em Andamento</option>
                                            <option value="CONCLUIDO" ${statusFormat == 'Concluído' ? 'selected' : ''}>Concluído</option>
                                        </select>
                                        `
                    }                       
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

async function verificarStatusSelecionado(selectElement, idChamado) {
    var dataFechamento = null
    if (selectElement.value == 'EM_ANDAMENTO') {
        alert('Chamado em andamento...');
        mudarStatusChamado(selectElement, idChamado, dataFechamento)

    } else if (selectElement.value == 'CONCLUIDO') {
        try {
            var resposta = await verificarInformacoesHistoricoChamado(idChamado);
            if (resposta.length < 1) {
                alert('Para que um chamado seja concluído, preencha toda a ficha!')
                setTimeout(function () {
                    window.location.reload()
                }, 1000);
            } else {
                var dataAtual = Date.now()
                dataFechamento = formatarDataParaSQL(dataAtual)
                mudarStatusChamado(selectElement, idChamado, dataFechamento)
            }
        } catch (error) {
            console.error('Erro ao verificar informações do histórico:', error);
        }
    }

}

async function verificarInformacoesHistoricoChamado(idChamado) {
    try {
        let response = await fetch(`/tecnico/buscarInformacoesHistorico/${idChamado}`, { cache: 'no-store' });
        let resposta = await response.json();
        console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);
        return resposta;
    } catch (error) {
        console.error('Erro ao buscar informações do histórico:', error);
        throw error;
    }
}


function formatarDataParaSQL(data) {
    if (!(data instanceof Date)) {
        data = new Date(data);
    }
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0, então adicione 1
    const dia = String(data.getDate()).padStart(2, '0');
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');

    return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}


function mudarStatusChamado(selectElement, idChamado, dataFechamento) {
    var statusSelecionadoVar = selectElement.value
    var idChamadoVar = idChamado
    var dataFechamentoVar = dataFechamento

    fetch("/tecnico/mudarStatusChamado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusSelecionadoServer: statusSelecionadoVar,
            idChamadoServer: idChamadoVar,
            dataFechamentoServer: dataFechamentoVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            // setTimeout(function() {
            //     window.location.reload();
            //   }, 2000);
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}

async function verificarSeExisteHistorico(idChamado) {
    try {
        let response = await fetch(`/tecnico/verificarSeExisteHistorico/${idChamado}`, { cache: 'no-store' });
        let resposta = await response.json();
        console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);
        return resposta;
    } catch (error) {
        console.error('Erro ao buscar informações do histórico:', error);
        throw error;
    }
}











