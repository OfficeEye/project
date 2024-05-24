var usuarioModel = require("../models/usuarioModel");


function logar(req, res) {
    console.log("Controller do Login - Clonar a data viz separadamente e consultar o controller chamado Autenticar")
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.logar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0])

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarEmpresa(req, res) {
   console.log("Controller de Cadastro - Clonar a data viz separadamente e consultar o controller chamado Cadastrar")
   // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
   var nomeFantasia = req.body.nomeFantasiaServer;
   var razaoSocial = req.body.razaoSocialServer;
   var cnpj = req.body.cnpjServer;
   var nome = req.body.nomeServer;
   var cpf = req.body.cpfServer;
   var email = req.body.emailServer;
   var senha = req.body.senhaServer;
   var fkEmpresa = req.body.fkEmpresaServer;

   // Faça as validações dos valores
   if (nomeFantasia == undefined) {
       res.status(400).send("Seu nome está undefined!");
   }else if (razaoSocial == undefined) {
        res.status(400).send("Razão Social está udefined!");
   } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está udefined!");
   } else if(nome == undefined) {
        res.status(400).send("Seu nome está undefined!")
   } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!")
   } else if (email == undefined) {
       res.status(400).send("Seu email está undefined!");
   } else if (senha == undefined) {
       res.status(400).send("Sua senha está undefined!");
   }else {

       // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
       usuarioModel.cadastrarEmpresa(nomeFantasia, razaoSocial, cnpj)
           .then(
               function (resultado) {
                   res.json(resultado);
               }
           ).catch(
               function (erro) {
                   console.log(erro);
                   console.log(
                       "\nHouve um erro ao realizar o cadastro! Erro: ",
                       erro.sqlMessage
                   );
                   res.status(500).json(erro.sqlMessage);
               }
           );

        usuarioModel.cadastrarUsuario(nome, cpf, email, senha, fkEmpresa).then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
   }
}

function existeEmpresa(req, res) {
    var nomeFantasia = req.body.nomeFantasiaServer;
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;

    if (nomeFantasia == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }else if (razaoSocial == undefined) {
         res.status(400).send("Razão Social está udefined!");
    } else if (cnpj == undefined) {
         res.status(400).send("Seu cnpj está udefined!");
    } else {
        usuarioModel.existeEmpresa(nomeFantasia, razaoSocial, cnpj)
            .then(
                function (resultado) {
                    if (resultado.length == 1){
                        res.json(resultado[0])
                    } else if (resultado.length == 0) {
                        res.status(403).send("Mais de uma empresa já cadastrada")
                    }
                    
                }
            ).catch(
                function (erro) {
                    console.log(erro)
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function ultimaEmpresaCadastrada(req, res) {
    
        usuarioModel.ultimaEmpresaCadastrada()
            .then(
                function (resultado) {
                    if (resultado.length == 1){
                        res.json(resultado[0])
                    } else if (resultado.length == 0){
                        res.status(403).send("nenhuma empresa cadastrada")
                    }                    
                }).catch(
                function (erro) {
                    console.log(erro)
                    res.status(500).json(erro.sqlMessage)
                }
            )
    
}

module.exports = {
    logar,
    cadastrarEmpresa,
    existeEmpresa,
    ultimaEmpresaCadastrada
}