

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
    // sessionStorage.ID_FUNCIONARIO = idFuncionario
    window.location = "especificacao-maquina.html";
}


function getMaquinaAlerta() {
    // sessionStorage.clear;
    var fkEmpresa = localStorage.EMPRESA_USUARIO;
    // sessionStorage.removeItem('ID_FUNCIONARIO')

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
                                                <td class="container-img">
                                                    <img class="btn-excluir" src="../assets/svg/trash-icon.svg" alt="">
                                                    <img class="btn-editar" src="../assets/svg/lapis.svg" alt="">
                                                </td>
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

