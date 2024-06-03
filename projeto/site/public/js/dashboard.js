function validarSessao() {
    var nome = localStorage.NOME_USUARIO;
    var empresa = localStorage.EMPRESA_USUARIO

    if(nome == null && empresa == null) {
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
function openModal(){
    modal.classList.add("active");
    modalBackground.classList.add("active");

}
function closeModal(){
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
                    for (let i = 0; i < funcionario.length; i++){
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
                    for (let i = 0; i < maquina.length; i++){
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

function contarComputadoresEmAlerta() {
    var fkEmpresa = localStorage.EMPRESA_USUARIO;

    if (!fkEmpresa) {
        console.log("fkEmpresa está vazio.");
    } else {
        fetch('../gestor/contarComputadoresEmAlerta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fkEmpresaServer: fkEmpresa
            }),
        }).then(
            function (resposta) {
                console.log('resposta: ', resposta);
                return resposta.json();
            }
        ).then(function (maquina) {
            if (maquina.length > 0) {
                var quantidade = maquina[0].COUNT;
                console.log(quantidade);
                var emEstadoAlerta = document.getElementById('emEstadoAlerta'); // Certifique-se de que o elemento com este ID existe
                emEstadoAlerta.innerHTML = quantidade;
            }
        }).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            }
        );
        return false;
    }
}