import java.util.Scanner;

public class LoginCadastro {

    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);
        LoginCadastroMetodos metodos = new LoginCadastroMetodos();

        System.out.println("Deseja realizar Cadastro(1) ou Login(2): ");
        Integer cadastroLogin = leitor.nextInt();

        if(cadastroLogin == 1){
            String mensagem;
            do {
                System.out.println("Cadastro:\nNome fantasia: ");
                String nomeFantasia = leitor.next();
                Boolean checkNomeFantasia = metodos.nomeFantasiaExiste(nomeFantasia);
                mensagem = checkNomeFantasia ? "nome valido" : "nome invalido";
                System.out.println(mensagem);
            }while(mensagem.equals("nome invalido"));

            do {
                System.out.println("Razão social: ");
                String razaoSocial = leitor.next();
                Boolean checkRazaoSocial = metodos.razaoSocialExiste(razaoSocial);
                mensagem = checkRazaoSocial ? "Razão social valida" : "Razão social invalida";
                System.out.println(mensagem);
            }while(mensagem.equals("Razão social invalida"));

            do {
                System.out.println("CNPJ: ");
                String cnpj = leitor.next();
                Boolean checkCNPJ = metodos.cnpjExiste(cnpj);
                mensagem = checkCNPJ ? "CNPJ valido" : "CNPJ invalido";
                System.out.println(mensagem);
            }while(mensagem.equals("CNPJ invalido"));

            do{
                System.out.println("email: ");
                String email = leitor.next();
                Boolean checkEmail = metodos.emailExiste(email);
                mensagem = checkEmail ? "Email valido" : "Email invalido";
                System.out.println(mensagem);
            }while(mensagem.equals("Email invalido"));


            System.out.println("senha: ");
            String senha = leitor.next();

            System.out.println("confirme senha: ");
            String confirmaSenha = leitor.next();



        }else if(cadastroLogin == 2){

            System.out.println("email: ");
            String email = leitor.next();

            System.out.println("senha: ");
            String senha = leitor.next();

        }else {
            System.out.println("Não é uma opção valida");
        }

    }

}
