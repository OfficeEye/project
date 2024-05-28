function returnDash() {
    window.location.href = "dashboard-gestor.html"
}
function returnCadastrarUsuario() {
    window.location.href = "cadastro-gestor.html"
}
function openModal(){
    modal.classList.add("active");
    modalBackground.classList.add("active");

}
function closeModal(){
    modal.classList.remove("active");
    modalBackground.classList.remove("active");
}
function returnConfig() {
    window.location.href = "config-gestor.html"
}
function buscarInformacoesUsuario() {
    var idUsuario = localStorage.ID_USUARIO;

    fetch("/gestor/buscarInformacoesUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (usuario) {
                console.log(usuario);
                nome_input.value = usuario.nome
                email_input.value =  usuario.email
                cpf_input.value = usuario.cpf
                senha_input.value = usuario.senha
            })
        }else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}
function editarInformacoesUsuario() {
    var idUsuario = localStorage.ID_USUARIO;
    var nomeVar = nome_input.value
    var emailVar = email_input.value
    var cpfVar = cpf_input.value
    var senhaVar = senha_input.value
    

    if (nomeVar == "") {
        
    } else if (emailVar.trim() == "" || emailVar.indexOf("@") == -1 || emailVar.indexOf(".") == -1) {
        
    } else if (cpfVar.length != 11) {
        
    } else if (senhaVar < 6) {

    } else {
        
        fetch("/gestor/editarInformacoesUsuario", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                nomeServer: nomeVar,
                emailServer: emailVar,
                cpfServer: cpfVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("atualizado!")
            console.log("resposta: ", resposta);
            localStorage.NOME_USUARIO = nomeVar;
        }).catch(function (erro) {
            console.log("#ERRO: " + erro);
        })
        return false;
    }
}

function excluirContaUsuario() {
    idUsuario = localStorage.ID_USUARIO;

    if (idUsuario == "") {

    } else {
        fetch("/gestor/excluirContaUsuario",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuarioServer: idUsuario
            })
        }).then(function (resposta) {
            console.log("Deletado")
            console.log("resposta: ", resposta);

            localStorage.removeItem('ID_USUARIO')
            localStorage.removeItem('EMPRESA_USUARIO')
            localStorage.removeItem('TIPO_USUARIO')
            localStorage.removeItem('NOME_USUARIO')
            window.location.href = "../login.html"
            
        }).catch(function (erro) {
            console.log("#ERRO: " + erro);
        })
        return false;
    }
}