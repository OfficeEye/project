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
        if (email.indexOf("@") == 1 || email.indexOf(".com") == 1 ) {
            checkEmail = true;
        }

        return checkEmail;
    }

//    String realizarCadastroLogin(Integer cadastroLogin){
//        Scanner leitor = new Scanner(System.in);
//
//        if(cadastroLogin == 1){
//
//            System.out.println("Cadastro:\n Nome fantasia");
//            String nomeFantasia = leitor.next();
//
//            System.out.println("Razão social: ");
//            String razaoSocial = leitor.next();
//
//            System.out.println("CNPJ: ");
//            String cnpj = leitor.next();
//
//            System.out.println("email: ");
//            String email = leitor.next();
//
//            System.out.println("senha: ");
//            String senha = leitor.next();
//
//            System.out.println("confirme senha: ");
//            String confirmaSenha = leitor.next();
//
//            return nomeFantasia;
//            return razaoSocial;
//            return  cnpj;
//            return email;
//            return senha;
//            return confirmaSenha;
//
//        }else if(cadastroLogin == 2){
//            return null;
//        }else {
//            System.out.println("Não é uma opção valida");
//            return null;
//        }
//    }
}
