

function validarSessao() {
    var nome = localStorage.NOME_USUARIO;
    var empresa = localStorage.EMPRESA_USUARIO

    if (nome == null && empresa == null) {
        window.location = "../login.html"
    }
}
function getNameUser() {
    const user = localStorage.NOME_USUARIO;
    nomeUser.innerHTML = `Bem vindo, ${user}`
}
function logout() {
    localStorage.removeItem('ID_USUARIO')
    localStorage.removeItem('EMPRESA_USUARIO')
    localStorage.removeItem('TIPO_USUARIO')
    localStorage.removeItem('NOME_USUARIO')

    closeModal()

    window.location = "../login.html";

}
function returnIndex() {
    window.location.href = "../login.html";
}
function openModal() {
    modal.classList.add("active");
    modalBackground.classList.add("active");

}
function closeModal() {
    modal.classList.remove("active");
    modalBackground.classList.remove("active");
}

function returnCadastrarUsuario() {
    window.location.href = "cadastro-gestor.html"
}

function returnDash() {
    window.location.href = "dashboard-gestor.html"
}

function returnConfig() {
    window.location.href = "config-gestor.html"
}

function getNomeFuncionarios() {
    var fkEmpresa = localStorage.EMPRESA_USUARIO;

    if (fkEmpresa == "") {

    } else {
        fetch("../gestor/getDadosFuncionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fkEmpresaServer: fkEmpresa
            }),
        }).then(
            function (resposta) {
                console.log("resposta: ", resposta);
                resposta.json().then(function (funcionario) {
                    console.log(funcionario);
                    for (let i = 0; i < funcionario.length; i++) {
                        var nome = funcionario[i].nome;
                        var email = funcionario[i].email;
                        var area = funcionario[i].area;
                        var idFuncionario = funcionario[i].idFuncionario;
                        var maquina = "false";
                        console.log(nome, email, area, maquina, idFuncionario)

                        funcionario_option.innerHTML += `
                            <option value="${idFuncionario}">${nome}</option>
                        `
                    }
                })
                // FAZER ALGO QUANDO EXECUTAR COM EXITO O COMANDO SQL
            }
        ).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`)
            }
        );
        return false;
    }
}

function cadastrarMaquina() {
    var nomeMaquinaVar = nomeMaquina_input.value;
    var modeloMaquinaVar = modeloMaquina_input.value;
    var idFuncionarioVar = funcionario_option.value;
    var fkEmpresaVar = localStorage.EMPRESA_USUARIO;

    if (nomeMaquinaVar == "") {

    } else if (modeloMaquinaVar == "") {

    } else if (idFuncionarioVar == "") {

    } else if (fkEmpresaVar == "") {

    } else {
        fetch("/tecnico/tecnicoCadastrarMaquina", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeMaquinaServer: nomeMaquinaVar,
                modeloMaquinaServer: modeloMaquinaVar,
                idFuncionarioServer: idFuncionarioVar,
                fkEmpresaServer: fkEmpresaVar,
                fkMaquinaServer: fkMaquina
            }),
        }).then(
            function (resposta) {
                console.log("resposta: ", resposta);
                // FAZER ALGO QUANDO EXECUTAR COM EXITO O COMANDO SQL
                getDadosMaquina()
            }
        ).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`)
            }
        );
        return false;
    }
}
var fkMaquina = 1;
function getDadosMaquina() {
    var fkEmpresaVar = localStorage.EMPRESA_USUARIO;

    if (fkEmpresaVar == "") {

    } else {
        fetch("../tecnico/getDadosMaquina", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fkEmpresaServer: fkEmpresaVar
            }),
        }).then(
            function (resposta) {
                if (resposta.ok) {
                    console.log("resposta: ", resposta);
                    resposta.json().then(function (maquina) {
                        console.log(maquina);
                        tbodyRefrigerador.innerHTML = "";
                        for (let i = 0; i < maquina.length; i++) {
                            var idMaquina = maquina[i].idMaquina;
                            var nomeFuncionario = maquina[i].nomeFuncionario;
                            var nomeMaquina = maquina[i].nomeMaquina;
                            var modelo = maquina[i].modelo;
                            var sistemaOperacional = maquina[i].sistemaOperacional;
                            var fabricante = maquina[i].fabricante
                            fkMaquina = maquina[i].idMaquina + 1;
                            console.log(idMaquina, nomeFuncionario, nomeMaquina, modelo, sistemaOperacional, fabricante)

                            tbodyRefrigerador.innerHTML += `
                            <tr id="${idMaquina}">
                                <td class="td-funcionario">${nomeFuncionario}</td>
                                <td class="td-maquina">${nomeMaquina}</td>
                                <td class="td-modelo">${modelo}</td>
                                <td class="td-sistemaOperacional">${sistemaOperacional}</td>
                                <td class="td-fabricante">${fabricante}</td>
                                <td class="container-img">
                                    <img class="btn-excluir" src="../assets/svg/trash-icon.svg" alt="" onclick="removerMaquina()">
                                    <img class="btn-editar" src="../assets/svg/lapis.svg" alt="" onclick="editarFuncionario(id)">
                                </td>
                            </tr>
                        `
                        }
                        console.log(fkMaquina)
                    })
                } else {
                    fkMaquina = 1;
                    console.log(fkEmpresaVar)
                    console.error('Nenhum dadoMaquina encontrado ou erro na API');
                    console.log(resposta)
                }

                // FAZER ALGO QUANDO EXECUTAR COM EXITO O COMANDO SQL
            }
        ).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`)
            }
        );
        return false;
    }
}

// GRAFICO 01(TEMPO MEDIO NA RESOLUÇÃO DE CHAMADOS)

function pegarDadosGrafico1() {
    let fkEmpresa = localStorage.EMPRESA_USUARIO;

    fetch("/gestor/pegarDadosGrafico1", {
        method: "POST", // Método POST para enviar dados
        cache: 'no-store',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fkEmpresa: fkEmpresa }), // Enviar fkEmpresa no corpo da solicitação
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                // resposta.reverse();

                plotarGrafico1(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function plotarGrafico1(dados) {
    let labels = []; // Armazenar as datas
    let data = []; // Armazenar os tempos médios em minutos

    // Converter os dados
    for (var i = 0; i < dados.length; i++) {
        let tempoMedio = dados[i].TempoMedioChamadoHorasMinutos;
        let horas = parseInt(tempoMedio.substring(0, 2)); // Extrair as horas
        let minutos = parseInt(tempoMedio.substring(3, 5)); // Extrair os minutos

        // Converter as horas e minutos para minutos totais
        let tempoTotalMinutos = horas * 60 + minutos;

        // Adicionar as datas e os tempos médios convertidos
        let dataFormatada = new Date(dados[i].Dia);
        let label = (dataFormatada.getDate()).toString().padStart(2, '0') + '/' + (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
        
        labels.push(label);
        data.push(tempoTotalMinutos);
    }
    
    let cores = ['rgba(255, 99, 132)','rgba(255, 159, 64)','rgba(255, 205, 86)','rgba(75, 192, 192)','rgba(153, 102, 255)'];
    
    const ctx = document.getElementById('barChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                data,
                label: '',
                fill: true,
                backgroundColor: cores,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            // Converter minutos para formato "HH:MM"
                            let horas = Math.floor(value / 60);
                            let minutos = value % 60;
                            return horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0');
                        }
                    }
                }
            }
        }
    });
}

function pegarDadosGrafico2(dados) {
    let fkEmpresa = localStorage.EMPRESA_USUARIO;

    fetch("/gestor/pegarDadosGrafico2", {
        method: "POST", // Método POST para enviar dados
        cache: 'no-store',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fkEmpresa: fkEmpresa }), // Enviar fkEmpresa no corpo da solicitação
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                // resposta.reverse();

                plotarGrafico2(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}
function plotarGrafico2(dados) {

    let labels = [];
    let abertos = []; 
    let resolvidos = [];

    for( let i = 0; i < dados.length; i++) {
        // Extrair dia e mês da data
        let dataFormatada = new Date(dados[i].Dia);
        let dia = (dataFormatada.getDate()).toString().padStart(2, '0');
        let mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
        let dataLabel = dia + '/' + mes;

        labels.push(dataLabel);
        abertos.push(dados[i].ChamadosAbertos);
        resolvidos.push(dados[i].ChamadosFechados);
    }

    const ctx = document.getElementById('lineChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Chamados Abertos',
                    data: abertos,
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'rgb(75, 192, 192)',
                },
                {
                    label: 'Chamados Resolvidos',
                    data: resolvidos,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function IniciarGraficos() {
    // Grafico de barras
    pegarDadosGrafico1();
    // Grafico de linha
    pegarDadosGrafico2();
}

function setEmpresaUsuario() {
    localStorage.setItem('EMPRESA_USUARIO', '1');
}

function contarComputadoresEmAlerta() {
    fetch("../gestor/contarComputadoresEmAlerta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkEmpresaServer: 1
        }),
    }).then(
        function (resposta) {
            console.log("resposta: ", resposta);
            resposta.json().then(function (computadores) {
                console.log(computadores);
                var quantidade = computadores[0]['COUNT(idUsuario)']
                console.log(quantidade)
                emEstadoAlerta.innerHTML = quantidade
            })
            // FAZER ALGO QUANDO EXECUTAR COM EXITO O COMANDO SQL
        }
    ).catch(
        function (resposta) {
            console.log(`#ERRO: ${resposta}`)
        }
    );
}



function contarChamadosPrioritariosAbertos() {
    fetch("../gestor/contarChamadosPrioritariosAbertos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkEmpresaServer: 1
        }),
    }).then(
        function (resposta) {
            console.log("resposta: ", resposta);
            resposta.json().then(function (chamados) {
                console.log(chamados);
                var quantidade = chamados[0]['COUNT(idUsuario)']
                console.log(quantidade)
                prioritariosAbertos.innerHTML = quantidade
            })
            // FAZER ALGO QUANDO EXECUTAR COM EXITO O COMANDO SQL
        }
    ).catch(
        function (resposta) {
            console.log(`#ERRO: ${resposta}`)
        }
    );

}



function contarAlertasMaisTempo(){
    fetch("../gestor/contarAlertasMaisTempo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkEmpresaServer: 1
        }),
    }).then(
        function (resposta) {
            console.log("resposta: ", resposta);
            resposta.json().then(function (alertas) {
                console.log(alertas);
                var quantidade = alertas[0]['COUNT(idUsuario)']
                console.log(quantidade)
                alertaMaisTempo.innerHTML = quantidade
            })
            // FAZER ALGO QUANDO EXECUTAR COM EXITO O COMANDO SQL
        }
    ).catch(
        function (resposta) {
            console.log(`#ERRO: ${resposta}`)
        }
    );

