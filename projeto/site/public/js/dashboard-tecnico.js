

const modalBackground = document.getElementById('modalBackground');
const modalSair = document.getElementById('modalSair');


function returnTabelaMaquinas(){
    window.location.href = "../dashboard-tecnico/tabela-maquinas.html";
}

function returnChamados(){
    window.location.href = "../dashboard-tecnico/tabela-chamados.html";
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


