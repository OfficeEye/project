const modalBackground = document.getElementById('modalBackground');
const modalSair = document.getElementById('modalSair');


function returnTabelaMaquinas(){
    window.location.href = "../dashboard-tecnico/tabela-maquinas.html";
}

function returnChamados(){
    window.location.href = "../dashboard-tecnico/tabela-chamados.html";
}

function returnNewChamado() {
    window.location.href = 'new-chamados.html'
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
    
    fetch(`/tecnico/buscarQuantidadeDeAlertasPorComponente/${fkEmpresa}/${dataSelecionada}`, { cache: 'no-store' }).then(function (response) {
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






