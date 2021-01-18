# Desafio Cadastramento de Participante de Previdência
Aplicação Java + Spring Boot que permite cadastro e edição de participantes de previdência.

## Como executar o projeto
- Configure uma conexão postgres local e crie o banco `sinqia`
- Navegue até a pasta raiz do projeto backend (mesma localização desse README) e execute o seguinte comando: `mvnw clean spring-boot:run`
- Aguarde alguns segundos até o projeto terminar de inicializar
- Faça uma chamada para `http://localhost:8080/actuator/health` para verificar que o projeto inicializou

### Observações
- Este projeto não possui testes por falta de tempo, tenho plena consciência da importância da presença de testes e que um projeto/tarefa sem testes não está completo/entregue.
- A funcionalidade de login não está implementada propriamente como um login, está funcional a recuperção e edição de participante cadastrado mas não é um login.