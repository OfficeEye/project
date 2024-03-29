import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Scanner;

public class LoginCadastro {

    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);
        LoginCadastroMetodos metodos = new LoginCadastroMetodos();
        List <String> listaEmail = new ArrayList<>();
        List <String> listaSenha = new ArrayList<>();

        listaEmail.add("jose@gmail.com");
        listaSenha.add("123456");

        Integer cadastroLogin;
        do {
            System.out.println("\nDeseja realizar Cadastro(1) ou Login(2): ");
            cadastroLogin = leitor.nextInt();

            if(cadastroLogin == 1){

                String mensagem;
                String senha;
                String confirmaSenha;

            do {
                System.out.println("Cadastro:\n------------------------------\nNome fantasia: ");
                String nomeFantasia = leitor.next();
                Boolean checkNomeFantasia = metodos.nomeFantasiaExiste(nomeFantasia);
                mensagem = checkNomeFantasia ? "nome valido" : "nome invalido";
                System.out.println(mensagem);
            }while(mensagem.equals("nome invalido"));

            do {
                System.out.println("------------------------------\nRazão social: ");
                String razaoSocial = leitor.next();
                Boolean checkRazaoSocial = metodos.razaoSocialExiste(razaoSocial);
                mensagem = checkRazaoSocial ? "Razão social valida" : "Razão social invalida";
                System.out.println(mensagem);
            }while(mensagem.equals("Razão social invalida"));

            do {
                System.out.println("------------------------------\nCNPJ: ");
                String cnpj = leitor.next();
                Boolean checkCNPJ = metodos.cnpjExiste(cnpj);
                mensagem = checkCNPJ ? "CNPJ valido" : "CNPJ invalido, ser exatos 14 numeros";
                System.out.println(mensagem);
            }while(mensagem.equals("CNPJ invalido, ser exatos 14 numeros"));

                do{
                    System.out.println("------------------------------\nemail: ");
                    String email = leitor.next();
                    Boolean checkEmail = metodos.emailExiste(email);
                    mensagem = checkEmail ? "Email valido" : "Email invalido";

                    if (checkEmail.equals(true)){
                        listaEmail.add(email);
                    }

                    System.out.println(mensagem);
                }while(mensagem.equals("Email invalido"));

                do {
                    System.out.println("------------------------------\nsenha: ");
                    senha = leitor.next();
                    Boolean checkSenha = metodos.senhaExiste(senha);
                    mensagem = checkSenha ? "Senha valida" : "Senha invalida, minímo 6 caracteres";
                    System.out.println(mensagem);
                }while(mensagem.equals("Senha invalida, minímo 6 caracteres"));

                do {
                    System.out.println("------------------------------\nconfirme senha: ");
                    confirmaSenha = leitor.next();
                    Boolean checkConfirmaSenha = metodos.confirmaSenhaExiste(senha, confirmaSenha);
                    mensagem = checkConfirmaSenha ? "Senha confirmada" : "Senha diferente";

                    if(checkConfirmaSenha.equals(true)){
                        listaSenha.add(senha);
                    }
                    System.out.println(mensagem);
                }while(!Objects.equals(confirmaSenha, senha));

            }else if(cadastroLogin == 2){
                Boolean emailValido = false;
                Boolean senhaValida = false;
                System.out.println("Login:");

                do {
                    System.out.println("------------------------------\nemail: ");
                    String email = leitor.next();
                    for (int i = 0; i < listaEmail.size(); i++){
                        if (email.equals(listaEmail.get(i))){
                            emailValido = true;

                            do {
                                System.out.println("------------------------------\nsenha: ");
                                String senha = leitor.next();
                                    if(senha.equals(listaSenha.get(i))){
                                        senhaValida = true;
                                        System.out.println("------------------------------\nLogado com sucesso!");
                                    }else {
                                        System.out.println("senha incorreta");
                                    }
                            }while(senhaValida.equals(false));
                        }else {
                            System.out.println("email não cadastrado");
                        }
                    }
                }while(emailValido.equals(false));



                break;

            }else {
                System.out.println("Não é uma opção valida");
            }
        }while(cadastroLogin != 1 || cadastroLogin != 2);

    }

}
