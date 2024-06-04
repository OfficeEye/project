

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



function getMaquinaAlerta() {
    var fkEmpresa = localStorage.EMPRESA_USUARIO;

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
                if(resposta.ok) {
                    // console.log(resposta)
                    resposta.json().then(function (funcionario) {                    
                        console.log(funcionario[0].idFuncionario)
                        var ultimoIDFuncionario = funcionario[0].idFuncionario

                        for(var i = 1; i <= ultimoIDFuncionario; i++) {
                            
                            var idFuncionario = i;
                            
                            fetch("../tecnico/getUltimoStatusRegistroEspacoDisponivel",{
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
                                    resposta.json().then(function (funcionario){
                                        console.log(funcionario[0])
                                        if(funcionario[0].statusRegistro == "Critico" || "Alerta") {
                
                                            var nomeFuncionario = funcionario[0].nome;
                                            var nomeMaquinaFuncionario = funcionario[0].nomeMaquina;
                                            var statusRegistro = funcionario[0].statusRegistro;
                                            var registroDisco = funcionario[0].registroNumero;
                                            var color = "red"
                                            if(funcionario[0].statusRegistro == "Critico") {
                                                color = "red"
                                            } else {
                                                color = "yellow"
                                            }
                                            tbodyRefrigerador.innerHTML += `
                                                <tr onclick="Maquina()">
                                                    <td class="td-nome">${nomeFuncionario}</td>
                                                    <td class="td-funcionario">${nomeMaquinaFuncionario}</td>
                                                    <td class="td-status" style="color: ${color};">${statusRegistro}</td>
                                                    <td class="td-cpu">null</td>
                                                    <td class="td-memoria">null</td>
                                                    <td class="td-disco" style="color: ${color};">${registroDisco}% Usado</td>
                                                    <td class="container-img">
                                                        <img class="btn-excluir" src="../assets/svg/trash-icon.svg" alt="">
                                                        <img class="btn-editar" src="../assets/svg/lapis.svg" alt="">
                                                    </td>
                                                </tr>
                                            `
                                            fetch("../tecnico/getUltimoStatusRegistroMemoriaUso", {
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
                                                            
                                                        })
                                                    }
                                                ).catch(
                                                    function (resposta) {
                                                        console.log(`#ERRO: ${resposta}`)
                                                    }
                                                )
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
                }else {
                    console.log("nenhum Funcionario cadastrado")
                }
                
            }
        ).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`)
            }
        )

        // fetch("../tecnico/getMaquinaAlerta", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         fkEmpresaServer: fkEmpresa
        //     }),
        // }).then(
        //     function (resposta) {
        //         console.log(resposta)
        //         resposta.json().then(function (maquina) {
        //             console.log(maquina)
        //             var idFuncionario = ""
        //             var nomeFuncionario = ""
        //             var nomeMaquina = ""
        //             let componenteDisco = []
        //             let componenteMemoria = []
        //             let componenteCPU = []

        //             let maquinaFuncionario = [{
        //                 idFuncionario: idFuncionario,
        //                 nomeFuncionario: nomeFuncionario,
        //                 nomeMaquina: nomeMaquina,

        //             }]
        //         })
        //     }
        // ).catch(
        //     function (resposta) {
        //         console.log(`#ERRO: ${resposta}`)
        //     }
        // )
        // return false;
    }
}

