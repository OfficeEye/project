function mudarEstadoInput() {
    var permision = document.getElementById('optionSelectPermision');
    var cargo = document.getElementById('cargo_input')
    var button = document.getElementById('buttonEnviar')

    if (permision.value == "funcionario") {
        cargo.disabled = false;
        cargo.classList.remove('input-cargo')
        button.onclick = cadastrarFuncionario;
    } else {
        cargo.disabled = true;
        cargo.value = "";
        cargo.classList.add('input-cargo')
        button.onclick = cadastrarUsuario;
    }
}
document.getElementById('optionSelectPermision').addEventListener('change', mudarEstadoInput)

function cadastrarFuncionario() {
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var cpfVar = cpf_input.value;
    var cargoVar = cargo_input.value;
    var senhaVar = senha_input.value;
    var confirmarSenhaVar = confirmacao_senha_input.value;
    var fkEmpresaVar = localStorage.EMPRESA_USUARIO;

    if (nomeVar == "") {

    }else if (emailVar.trim() == "" || emailVar.indexOf("@") == -1 || emailVar.indexOf(".") == -1) {

    }else if (cpfVar.length != 11) {

    }else if (cargoVar == "") {

    }else if (senhaVar < 6) {

    } else if (confirmarSenhaVar != senhaVar) {

    } else {
        fetch("../gestor/gestorCadastrarFuncionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                cpfServer: cpfVar,
                cargoServer: cargoVar,
                senhaServer: senhaVar,
                fkEmpresaServer: fkEmpresaVar
            }),
        }).then(
            function (resposta) {
                console.log("resposta: ", resposta);
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
function cadastrarUsuario() {
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var cpfVar = cpf_input.value;
    var permisionVar = optionSelectPermision.value;;
    var senhaVar = senha_input.value;
    var confirmarSenhaVar = confirmacao_senha_input.value;
    var fkEmpresaVar = localStorage.EMPRESA_USUARIO;

    if (nomeVar == "") {

    }else if (emailVar.trim() == "" || emailVar.indexOf("@") == -1 || emailVar.indexOf(".") == -1) {

    }else if (cpfVar.length != 11) {

    }else if (senhaVar < 6) {

    }else if (confirmarSenhaVar != senhaVar) {

    }else {
        fetch("../gestor/gestorCadastrarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                cpfServer: cpfVar,
                permisionServer: permisionVar,
                senhaServer: senhaVar,
                fkEmpresaServer: fkEmpresaVar
            }),
        }).then(
            function (resposta) {
                console.log("resposta: ", resposta);
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
    localStorage.removeItem('EMPRESA_USUARIO')
    localStorage.removeItem('TIPO_USUARIO')
    localStorage.removeItem('NOME_USUARIO')

    setTimeout(function () {
        window.location = "../login.html";
    }, 300); // apenas para exibir o loading

}

function cadastrar() {
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var cpfVar = cpf_input.value;
    var permisionVar = optionSelectPermision.value;
    var cargoVar = cargo_input.value;
    var senhaVar = senha_input.value;
    var confirmarSenhaVar = confirmacao_senha_input.value;
    var fkEmpresaVar = localStorage.EMPRESA_USUARIO;

    if (nomeVar == "") {

        document.getElementById('nome_input').style.borderColor = "red" 
        document.getElementById('nome_correct').style.color = "red"

        if (emailVar.trim() == "" || emailVar.indexOf("@") == -1 || emailVar.indexOf(".") == -1) {
            
            document.getElementById('email_input').style.borderColor = "red"
            document.getElementById('email_correct').style.display = "none"
            document.getElementById('email_error').style.display = "flex"

            if (cpfVar.length != 11) {

                document.getElementById('cpf_input').style.borderColor = "red"
                document.getElementById('cpf_correct').style.display = "none"
                document.getElementById('cpf_error').style.display = "flex"

                if (permisionVar == "funcionario") {
                    if (cargoVar == "") {
                        
                        document.getElementById('cargo_input').style.borderColor = "red" 
                        document.getElementById('cargo_correct').style.color = "red"

                        if (senhaVar < 6) {

                            document.getElementById('senha_input').style.borderColor = "red"
                            document.getElementById('senha_correct').style.display = "none"
                            document.getElementById('senha_error').style.display = "flex"
        
                        }
                    }
                }else if (senhaVar < 6) {

                    document.getElementById('senha_input').style.borderColor = "red"
                    document.getElementById('senha_correct').style.display = "none"
                    document.getElementById('senha_error').style.display = "flex"

                }
            }
        }
    }else if (emailVar.trim() == "" || emailVar.indexOf("@") == -1 || emailVar.indexOf(".") == -1) {
        document.getElementById('email_input').style.borderColor = "red"
        document.getElementById('email_correct').style.display = "none"
        document.getElementById('email_error').style.display = "flex"

        if (cpfVar.length != 11) {  

            document.getElementById('cpf_input').style.borderColor = "red"
            document.getElementById('cpf_correct').style.display = "none"
            document.getElementById('cpf_error').style.display = "flex"

            if (permisionVar == "funcionario") {
                if (cargoVar == "") {
                    
                    document.getElementById('cargo_input').style.borderColor = "red" 
                    document.getElementById('cargo_correct').style.color = "red"

                    if (senhaVar < 6) {

                        document.getElementById('senha_input').style.borderColor = "red"
                        document.getElementById('senha_correct').style.display = "none"
                        document.getElementById('senha_error').style.display = "flex"
    
                    }
                }
            }else if (senhaVar < 6) {

                document.getElementById('senha_input').style.borderColor = "red"
                document.getElementById('senha_correct').style.display = "none"
                document.getElementById('senha_error').style.display = "flex"

            }
        }
    } else if (cpfVar.length != 11) {

    } else if (permisionVar == "funcionario") {
        if (cargoVar == "") {

        } else if (senhaVar < 6) {

        } else if (confirmarSenhaVar != senhaVar) {

        }else {
            fetch("../gestor/gestorCadastrarFuncionario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeServer: nomeVar,
                    emailServer: emailVar,
                    cpfServer: cpfVar,
                    cargoServer: cargoVar,
                    senhaServer: senhaVar,
                    fkEmpresaServer: fkEmpresaVar
                }),
            }).then(
                function (resposta) {
                    console.log("resposta: ", resposta);
                    // FAZER ALGO QUANDO EXECUTAR COM EXITO O COMANDO SQL
                }
            ).catch(
                function (resposta) {
                    console.log(`#ERRO: ${resposta}`)
                }
            );
            return false;
        }
    } else if (senhaVar < 6) {

    } else if (confirmarSenhaVar != senhaVar) {

    } else {
        
        fetch("../gestor/gestorCadastrarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                cpfServer: cpfVar,
                permisionServer: permisionVar,
                senhaServer: senhaVar,
                fkEmpresaServer: fkEmpresaVar
            }),
        }).then(
            function (resposta) {
                console.log("resposta: ", resposta);
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


function openModal(texto){
    modalSair.classList.add("active");
    modalBackground.classList.add("active");
}
function closeModal(){
    modalSair.classList.remove("active");
    modalRemover.classList.remove("active");
    modalEditar.classList.remove("active");
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

function removerMaquina() {
    modalRemover.classList.add("active");
    modalBackground.classList.add("active");
}

function editarMaquina() {
    modalEditar.classList.add("active");
    modalBackground.classList.add("active");
}

function confirmarRemocao(){

}

function confirmarEdicao(){
}