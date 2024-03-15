import java.util.Scanner;

public class LoginCadastroMetodos {

    Boolean nomeFantasiaExiste(String nomeFantasia){
        Boolean checkNomeFantasia = true;
        if(nomeFantasia.length() > 60){
            checkNomeFantasia = false;
        }

        return checkNomeFantasia;
    }

    Boolean razaoSocialExiste(String razaoSocial){
        Boolean checkRazaosocial = true;
        if(razaoSocial.length() > 30){
            checkRazaosocial = false;
        }

        return checkRazaosocial;
    }

    Boolean cnpjExiste(String cnpj){
        Boolean checkCNPJ = false;
        if(cnpj.length() == 14){
            checkCNPJ = true;
        }

        return checkCNPJ;
    }

    Boolean emailExiste(String email){
        Boolean checkEmail = false;
        if (email.indexOf("@") >= 1 || email.indexOf(".com") >= 1 ) {
            checkEmail = true;
        }

        return checkEmail;
    }

    Boolean senhaExiste(String senha){
        Boolean checkSenha = false;
        if(senha.length() >= 6){
            checkSenha = true;
        }

        return  checkSenha;
    }

    Boolean confirmaSenhaExiste(String senha, String confirmaSenha){
        Boolean checkConfirmaSenha = false;
        if(senha.equals(confirmaSenha)){
            checkConfirmaSenha = true;
        }

        return checkConfirmaSenha;
    }
}
