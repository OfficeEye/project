const modalBackground = document.getElementById('modalBackground');
const modalSair = document.getElementById('modalSair');


function returnTabelaMaquinas() {
    window.location.href = "../dashboard-tecnico/tabela-maquinas.html";
}

function returnChamados() {
    window.location.href = "../dashboard-tecnico/tabela-chamados.html";
}

function openModal(texto) {
    modalSair.classList.add("active");
    modalBackground.classList.add("active");
}

function closeModal() {
    console.log(modalSair.classList); // Isso mostrará as classes do modalSair no console
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

function Maquina(idFuncionario){
    sessionStorage.ID_FUNCIONARIO = idFuncionario
    window.location = "especificacao-maquina.html";
}

function plotarGraficoEspecificacaoMaquina() {
    var idFuncionario = sessionStorage.ID_FUNCIONARIO;
    var fkEmpresa = localStorage.EMPRESA_USUARIO;

    if (idFuncionario == "") {

    } else if (fkEmpresa == ""){

    }else {
        fetch("../tecnico/getUltimosRegistroComponentesUsoCpu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fkEmpresaServer: fkEmpresa,
                idFuncionarioServer: idFuncionario
            }),
        }).then(
            function (resposta) {
                resposta.json().then(function (registro) {
                    console.log(registro)
                    div_nome_maquina.innerHTML = `
                    <b>${registro[0].nomeMaquina}</b>
                    `

                    let labels = []
                    let data = []
                    
                    for(let i = registro.length- 1; i > 0; i--) {
                        var registroUsoCpu = registro[i].registroNumero
                        var dataHora = registro[i].dataRegistro
                        data.push(registroUsoCpu)
                        labels.push(dataHora)
                    }
                    const dataCpu = {
                        labels: labels,
                                datasets: [{
                            label: '',
                            data: data,
                            backgroundColor: [
                                'rgba(85, 173, 250)',
                                'rgba(85, 173, 250)',
                                'rgba(85, 173, 250)',
                                'rgba(85, 173, 250)',
                            ],
                            borderColor: [
                                'rgb(85, 173, 250)',
                                'rgb(85, 173, 250)',
                                'rgb(85, 173, 250)',
                                'rgb(85, 173, 250)',
                            ],
                            borderWidth: 1
                
                        }]
                    };
                    const configCpu = {
                        type: 'line',
                        data: dataCpu,
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: false
                                },
                            },
                        },
                    };
                
                    Chart.defaults.color = '#fff';
                    Chart.defaults.borderColor = '#fff';
                
                    const chartCpu = new Chart(
                        document.getElementById('chartCpu'),
                        configCpu
                    );
                })
            }
        
        ).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`)
            }
        )

        fetch("../tecnico/getUltimosRegistroComponentesUsoMemoriaRam", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fkEmpresaServer: fkEmpresa,
                idFuncionarioServer: idFuncionario
            }),
        }).then(
            function (resposta) {
                resposta.json().then(function (registro) {
                    console.log(registro)
                    div_nome_maquina.innerHTML = `
                    <b>${registro[0].nomeMaquina}</b>
                    `

                    let labels = []
                    let data = []
                    
                    for(let i = registro.length- 1; i > 0; i--) {
                        var registroUsoMemoriaRam = registro[i].registroNumero
                        var dataHora = registro[i].dataRegistro
                        data.push(registroUsoMemoriaRam)
                        labels.push(dataHora)
                    }
                    const dataMemoria = {
                        labels: labels,
                        datasets: [{
                            label: '',
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132)',
                                'rgba(255, 159, 64)',
                                'rgba(255, 205, 86)',
                                'rgba(75, 192, 192)',
                            ],
                            borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                            ],
                            borderWidth: 1
                
                        }]
                    };
                
                    const configMemoria = {
                        type: 'line',
                        data: dataMemoria,
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: false
                                },
                            },
                        },
                    };
                
                    Chart.defaults.color = '#fff';
                    Chart.defaults.borderColor = '#fff';
                
                    const chartMemoria = new Chart(
                        document.getElementById('chartMemoria'),
                        configMemoria
                    );
                })
            }
        
        ).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`)
            }
        )

        fetch("../tecnico/getUltimosRegistroComponentesUsoDisco", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fkEmpresaServer: fkEmpresa,
                idFuncionarioServer: idFuncionario
            }),
        }).then(
            function (resposta) {
                resposta.json().then(function (registro) {
                    console.log(registro)
                    div_nome_maquina.innerHTML = `
                    <b>${registro[0].nomeMaquina}</b>
                    `

                    let labels = []
                    let data = []
                    
                    for(let i = registro.length- 1; i > 0; i--) {
                        var registroUsoDisco = registro[i].registroNumero
                        var dataHora = registro[i].dataRegistro
                        data.push(registroUsoDisco)
                        labels.push(dataHora)
                    }
                    const dataDisco = {
                        labels: labels,
                                datasets: [{
                            label: '',
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132)',
                                'rgba(255, 159, 64)',
                                'rgba(255, 205, 86)',
                                'rgba(75, 192, 192)',
                            ],
                            borderColor: [
                                'rgb(85, 173, 250)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                            ],
                            borderWidth: 1
                
                        }]
                    };
                
                    const configDisco = {
                        type: 'line',
                        data: dataDisco,
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: false
                                },
                            },
                        },
                    };
                
                    Chart.defaults.color = '#fff';
                    Chart.defaults.borderColor = '#fff';
                
                    const chartDisco = new Chart(
                        document.getElementById('chartDisco'),
                        configDisco
                    );
                })
            }
        
        ).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`)
            }
        )

        fetch("../tecnico/getUltimosRegistroComponentesTemperaturaCpu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fkEmpresaServer: fkEmpresa,
                idFuncionarioServer: idFuncionario
            }),
        }).then(
            function (resposta) {
                resposta.json().then(function (registro) {
                    console.log(registro)
                    div_nome_maquina.innerHTML = `
                    <b>${registro[0].nomeMaquina}</b>
                    `

                    let labels = []
                    let data = []
                    
                    for(let i = registro.length- 1; i > 0; i--) {
                        var registroTemperaturaCpu = registro[i].registroNumero
                        var dataHora = registro[i].dataRegistro
                        data.push(registroTemperaturaCpu)
                        labels.push(dataHora)
                    }
                    const dataTemperatura = {
                        labels: labels,
                            datasets: [{
                            label: '',
                            data: data,
                            backgroundColor: [
                                'rgba(85, 250, 126)',
                                'rgba(85, 250, 126)',
                                'rgba(85, 250, 126)',
                                'rgba(75, 192, 192)',
                            ],
                            borderColor: [
                                'rgb(85, 250, 126)',
                                'rgb(85, 250, 126)',
                                'rgb(85, 250, 126)',
                                'rgb(85, 250, 126)',
                
                            ],
                            borderWidth: 1
                
                        }]
                    };
                
                    const configTemperatura = {
                        type: 'line',
                        data: dataTemperatura,
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: false
                                },
                            },
                        },
                    };
                
                    Chart.defaults.color = '#fff';
                    Chart.defaults.borderColor = '#fff';
                
                    const chartTemperatura = new Chart(
                        document.getElementById('chartJanela'),
                        configTemperatura   
                    );
                })
            }
        
        ).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`)
            }
        )
    }
}


function getMaquinaAlerta() {
    
    if(sessionStorage.getItem('ID_FUNCIONARIO')) {
        location.reload();
    }
    var fkEmpresa = localStorage.EMPRESA_USUARIO;
    sessionStorage.removeItem('ID_FUNCIONARIO')

    if (fkEmpresa == "") {

    } else {

        fetch("../tecnico/getUltimoIDFuncionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fkEmpresaServer: fkEmpresa
            }),
        }).then(
            function (resposta) {
                if (resposta.ok) {
                    // console.log(resposta)
                    resposta.json().then(function (funcionario) {
                        console.log(funcionario[0].idFuncionario)
                        var ultimoIDFuncionario = funcionario[0].idFuncionario

                        for (var i = 1; i <= ultimoIDFuncionario; i++) {

                            var idFuncionario = i;

                            fetch("../tecnico/getUltimoStatusRegistro", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    fkEmpresaServer: fkEmpresa,
                                    idFuncionarioServer: idFuncionario
                                }),
                            }).then(
                                function (resposta) {
                                    resposta.json().then(function (funcionario) {
                                        console.log(funcionario)
                                        if(
                                            funcionario[0].statusRegistro == 'Crtico' ||
                                            funcionario[0].statusRegistro == 'Alerta' ||
                                            funcionario[1].statusRegistro == 'Crtico' ||
                                            funcionario[1].statusRegistro == 'Alerta' ||
                                            funcionario[2].statusRegistro == 'Crtico' ||
                                            funcionario[2].statusRegistro == 'Alerta' ||
                                            funcionario[4].statusRegistro == 'Crtico' ||
                                            funcionario[4].statusRegistro == 'Alerta' 
                                        ) {

                                            let nomeFuncionario = funcionario[0].nome;
                                            let nomeMaquinaFuncionario = funcionario[0].nomeMaquina;
                                            let idFuncionario = funcionario[0].idFuncionario;
                                            let registroDisco = funcionario[0].registroNumero;
                                            let registroMemoria = funcionario[1].registroNumero;
                                            let registroCpuUso = funcionario[2].registroNumero;
                                            let registroCpuTotalProcessos = funcionario[3].registroNumero;
                                            let registroCpuTemperatura = funcionario[4].registroNumero;
                                            
                                            let corDisco = 'white';
                                            let corMemoria = 'white';
                                            let corCPU = 'white';
                                            let corStatus = 'yellow'
                                            let textoStatus = 'Critico'
                                            
                                            if(funcionario[0].statusRegistro == 'Critico') {
                                                corDisco = "red"                             
                                                
                                            } else if (funcionario[0].statusRegistro == 'Alerta') {
                                                corDisco = 'yellow' 
                                            }
                                            
                                            if(funcionario[1].statusRegistro == 'Critico') {
                                                corMemoria = "red"                            
                                                
                                            } else if (funcionario[1].statusRegistro == 'Alerta') {
                                                corMemoria = 'yellow'
                                            }
                                            
                                            if(funcionario[2].statusRegistro == 'Critico' || funcionario[4].statusRegistro == 'Critico') {
                                                corCPU = "red"                    
                                                
                                            } else if (funcionario[2].statusRegistro == 'Alerta' || funcionario[4].statusRegistro == 'Alerta') {
                                                corCPU = 'yellow'
                                            }
                                            
                                            for(let i = 0; i < funcionario.length; i++) {
                                                if(funcionario[i].statusRegistro == 'Critico') {
                                                    corStatus = 'red'
                                                }
                                            }
                                            
                                            if (corStatus == 'yellow') {
                                                textoStatus = 'Alerta'
                                            }
                                            
                                            tbodyRefrigerador.innerHTML += `
                                            <tr  onclick="Maquina(${idFuncionario})">
                                                <td class="td-nome">${nomeFuncionario}</td>
                                                <td class="td-funcionario">${nomeMaquinaFuncionario}</td>
                                                <td class="td-status" style="color: ${corStatus};">${textoStatus}</td>
                                                <td class="td-cpu" style="color: ${corCPU};">${registroCpuUso}%</td>
                                                <td class="td-memoria" style="color: ${corMemoria};">${registroMemoria}%</td>
                                                <td class="td-disco" style="color: ${corDisco};">${registroDisco}%</td>
                                            </tr>
                                            `
                                        }
                                        })
                                    }
                            ).catch(
                                function (resposta) {
                                    console.log(`#ERRO: ${resposta}`)
                                }
                            )
                        }

                    })
                } else {
                    console.log("nenhum Funcionario cadastrado")
                }

            }
        ).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`)
            }
        )

        
    }
}

function exibirQuantidadeAlertaPorComponente() {

    var dataSelecionada = document.getElementById('data_selecionada').value;
    var fkEmpresa = localStorage.getItem('EMPRESA_USUARIO')
    

    if(dataSelecionada == "") {
        dataSelecionada = new Date();
        let ano = dataSelecionada.getFullYear();
        let mes = (dataSelecionada.getMonth() + 1).toString().padStart(2, '0');
        let dia = dataSelecionada.getDate().toString().padStart(2, '0');
        dataSelecionada = `${ano}-${mes}-${dia}`;

    }
    
    fetch(`/tecnico/buscarQuantidadeDeAlertasPorComponente/${fkEmpresa}/${dataSelecionada}`, {
         cache: 'no-store' 
        }).then(function (response) {
        response.json().then(function (resposta) {
            console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);
            
            let qtdAlertasCpu = 0;
            let qtdAlertasMemoria = 0;
            let qtdAlertasDisco = 0;

            for (var i = 0; i < resposta.length; i++) {
                if (resposta[i].nomeComponente == 'CPU') {
                   qtdAlertasCpu += Number(resposta[i].TotalRegistros)
                }else if (resposta[i].nomeComponente == 'Disco') {
                    qtdAlertasDisco += resposta[i].TotalRegistros
                }else if (resposta[i].nomeComponente == 'Memória') {
                    qtdAlertasMemoria += resposta[i].TotalRegistros
                }
            }

            let dadosAlertas = [qtdAlertasCpu, qtdAlertasMemoria, qtdAlertasDisco]
            console.log(dadosAlertas)
            
            plotarGraficoQuantidadeAlertas(dadosAlertas)
        });
    })
}

let myChart; 

function plotarGraficoQuantidadeAlertas(dadosAlertas) {

    // Verifique se myChart existe e destrua-o se necessário
    if (myChart) {
        myChart.destroy();
    }

    let labels = ['CPU', 'Memória', 'Disco'];
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Quantidade de Alertas',
            data: [], 
            fill: false,
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)'
            ],
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(255, 159, 64)',
                'rgba(255, 205, 86)',
                'rgba(75, 192, 192)',
            ],
            tension: 0.1,
            borderWidth: 1
        }]
    };

    for (let i = 0; i < dadosAlertas.length; i++) {
        let registro = dadosAlertas[i];
        dados.datasets[0].data.push(registro);
    }

    const config = {
        type: 'bar',
        data: dados,
    };

    // Cria um novo gráfico
    myChart = new Chart(
        document.getElementById('alertas_por_componente'),
        config
    );
}

function exibirQuantidadeDeMaquinasEmAlerta() {
    var fkEmpresa = localStorage.getItem('EMPRESA_USUARIO')
    fetch(`/tecnico/buscarQuantidadeDeMaquinasEmAlerta/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        response.json().then(function (resposta) {
            console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);
            


            if (resposta.length > 0) {
                var qtdTotalMaquinas = 0;
                var qtdTotalDeMaquinasEmAlerta = 0;
                var ultimoIndiceAlerta = 0
                qtdTotalMaquinas = 1
                var ultimoIdMaquina = resposta[0].fkMaquina;

                for (var i = 0; i < resposta.length; i++) {
                    if (resposta[i].fkMaquina > ultimoIdMaquina) {
                        ultimoIdMaquina = resposta[i].fkMaquina
                        qtdTotalMaquinas++
                    }

                    if(resposta[i].statusRegistro == 'Crítico' || resposta[i].statusRegistro == 'Alerta' ) {
                        if (resposta[i].fkMaquina != ultimoIndiceAlerta ) {
                            qtdTotalDeMaquinasEmAlerta++
                            ultimoIndiceAlerta = resposta[i].fkMaquina
                        }
                    }
                    
                }

                var porcentagemIdeal = (qtdTotalMaquinas * 0.25)
                var porcentagemAlerta = (qtdTotalMaquinas * 0.75)
                var corIndicador = `red`;

                if (qtdTotalDeMaquinasEmAlerta <= porcentagemIdeal) {
                    corIndicador = `rgb(0, 161, 0)`

                }else if(qtdTotalDeMaquinasEmAlerta <= porcentagemAlerta) {
                    corIndicador = ` yellow`
                }
                console.log(qtdTotalDeMaquinasEmAlerta)
                let em_alerta = document.getElementById('em_alerta')
                em_alerta.innerHTML = `${qtdTotalDeMaquinasEmAlerta}/${qtdTotalMaquinas}`
                em_alerta.style.color = corIndicador

            }else {
                em_alerta.innerHTML = `0/0`
                em_alerta.style.color = `rgb(0, 161, 0)`
            }
        });
    })
    setTimeout(function() {
        exibirQuantidadeDeMaquinasEmAlerta()
      }, 10000);
}

function buscarQtdChamadosAbertos() {
    var fkEmpresa = localStorage.getItem('EMPRESA_USUARIO')
    fetch(`/tecnico/buscarQtdChamadosAbertos/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        response.json().then(function (resposta) {
            console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);
            
            chamados_em_andamento.innerHTML = `${resposta[0].TotalChamados}`
           
        });
    })
}


function buscarQtdMaquinasTotal() {
    var fkEmpresa = localStorage.getItem('EMPRESA_USUARIO')
    fetch(`/tecnico/buscarQtdMaquinasTotal/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        response.json().then(function (resposta) {
            console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);
            
            if (resposta.length > 0) {

                var qtdMaquinas = resposta[0].totalMaquinas
                var qtdFuncionarios = resposta[0].totalFuncionarios
                var cor = ``

                if (qtdMaquinas == qtdFuncionarios) {
                    cor = `rgb(0, 161, 0)`
                } else if (qtdMaquinas >= (qtdFuncionarios - 2)) {
                    cor = `yellow`
                } else  {
                    cor = `red`
                }
                maquinas_totais.innerHTML = `${qtdMaquinas}/${qtdFuncionarios}`
                maquinas_totais.style.color = cor;
            }else{
                maquinas_totais.innerHTML = `0`
            }
           
           
        });
    })
}






