# Encontre um Mecânico

#### Membros da equipe:
- Augusto Polizer (AP)
- Brian Aikau (BA)
- Eduardo Oliveira (EO)
- Marlon Alves (MA)
- Rander Gabriel (RG)

#### Funcionalidades do sistema:
Sistema que conecta, em tempo real, mecânicos a motoristas que precisam de um atendimento rápido e seguro de manutenção ou reparo de veículos automotivos. O sistema terá um cadastro de mecânicos, que podem ter uma loja física e informar sua disponibilidade para deslocamento até o veículo com defeito; além de um cadastro de motoristas e informações dos seus respectivos veículos. Demais funcionalidades referem-se a pesquisar, avaliar e exibir perfil do mecânico, calcular deslocamento, tempo de chegada e confirmar solicitação de atendimento.

#### Tecnologia a ser utilizada:
- TypeScript, utilizando Node.js, em back-end.
- Banco de dados MySQL para armazenamento das informações. 
- WebService que será responsável pelo recebimento das requisições, tratamento dos dados e disponibilização do conteúdo requisitado, em formato JSON.
- Front-end com Vue.js e Bulma.

### Sprint Planning

1. Como um motorista, eu quero cadastrar meu perfil para ter acesso ao sistema e realizar solicitações de atendimento.<br>
1.1. Definir entidades no backend (AP) <br> 
1.2. Criar migração no banco de dados (AP) <br> 
1.3. Criar camada de acesso a dados no backend (AP) <br>
1.4. Criar método de inserção de motorista na camada de acesso a dados (AP)<br> 
1.5. Criar controller de usuário/motorista (AP) <br> 
1.6. Criar rota POST para criação do usuário motorista (AP) <br> 
1.7. Criar tela de cadastro de motorista (AP) <br> 

2. Como um motorista, eu quero acessar meu perfil usando as credenciais que defini no cadastro.<br>
2.1. Criar método de autenticação de motorista (AP) <br> 
2.2. Ajustar modelos no backend para suportar autenticação de motorista (AP) <br> 
2.3. Criar migração no banco de dados (AP) <br>
2.4. Criar rota POST de login para motoristas (AP)<br>
2.5. Criar tela de login (AP) <br> 

3. Como um motorista, eu quero recuperar meus dados de cadastro caso eu esqueça. <br>
3.1. Criar rota de envio de e-mail de recuperação de senha para motoristas (EO)<br>
3.2. Adicionar link para redefinir senha na tela de login (EO)<br>
3.3. Criar tela de redefinir senha para o motorista (EO)<br>
3.4. Criar template de e-mail dinamicamente (com o link para a rota de recuperação) (EO)<br>
3.5. Criar rota GET para recuperação de senha (EO)<br>
3.6. Criar método na camada de acesso a dados para atualização da senha do motorista (EO)<br>

4. Como um motorista, eu quero cadastrar os meus veículos para que o mecânico possa ver informações do meu veículo com defeito antes de iniciar o atendimento.<br>
4.1. Criar modelo no backend para cadastro de veículos para motoristas (BA)<br>
4.2. Criar entidade no banco de dados para veículos de motoristas (BA) <br>
4.3. Criar método na camada de acesso à dados para criação de veículo de motorista (BA) <br>
4.4. Criar rota POST para criação de veículo de motorista (BA) <br>
4.5. Criar tela de cadastro para veículos de motorista (BA) <br>

5. Como um mecânico, eu quero cadastrar meu perfil para ter acesso ao sistema e estar apto a realizar atendimentos.<br>
5.1. Definir entidades no Backend (RG) <br>
5.2. Criar migração no banco de dados (RG) <br>
5.3. Criar método de inserção de mecânico na camada de acesso a dados (RG) <br>
5.4. Criar controller de usuário/mecânico (RG) <br>
5.5. Criar rota POST para criação do usuário mecânico (RG) <br>
5.6. Criar tela de cadastro de mecânico (RG)<br>

6. Como um mecânico, eu quero acessar meu perfil usando as credenciais que defini no cadastro. <br>
6.1. Criar método de autenticação de mecânico (RG) <br>
6.2. Ajustar modelos no backend para suportar autenticação de mecânico (RG) <br>
6.3. Criar migração no banco de dados (RG) <br>
6.4. Criar rota POST de login para mecânicos (RG) <br>
6.5. Criar tela de login (RG)<br>

7. Como um mecânico, eu quero recuperar meus dados de cadastro caso eu esqueça. (EO)<br>
7.1. Criar rota de envio de e-mail de recuperação de senha para mecânicos (EO)<br>
7.2. Criar serviço de disparo de e-mail (EO)<br>
7.3. Criar método de envio de e-mail no serviço de e-mail (EO)<br>
7.4. Adicionar link para redefinir senha na tela de login (EO)<br>
7.5. Criar tela para redefinição de senha para o mecânico (EO)<br>
7.6. Criar template de e-mail dinamicamente com o link para a rota de recuperação (EO)<br>
7.7. Criar rota GET para recuperação de senha que deve passar um token temporário na query string (EO)<br>
7.8. Criar método na camada de acesso a dados para atualização da senha do mecânico (EO) <br>

8. Como um mecânico, eu quero indicar o endereço da minha oficina mecânica e minha disponibilidade para deslocamento, para que o motorista saiba se pode ou não contar com os meus serviços, dependendo da sua localização.<br>
8.1. Criar modelos no backend para oficinas (MA)<br>
8.2. Criar entidades no banco de dados para oficinas (MA)<br>
8.3. Criar migração no banco de dados para oficinas (MA)<br>
8.4. Criar método na camada de acesso à dados para criação de oficinas  (MA)<br>
8.5. Criar tela de cadastro de oficina  (MA)<br>
8.6. Criar rota POST para criação de oficinas (MA)<br>

9. Como um mecânico, eu quero cadastrar os meus veículos de trabalho, para que o motorista saiba que em qual veículo estou me deslocando para atendê-lo, quando for o caso. <br>
9.1. Criar modelos no backend para veículos de trabalho (BA) <br>
9.2. Criar entidades no banco de dados para veículos de trabalho (BA) <br>
9.3. Criar migração no banco de dados para veículos de trabalho (BA) <br>
9.4. Criar método de criação de veículos de trabalho na camada de acesso à dados (BA) <br>
9.5. Criar rota POST para criação de veículos de trabalho (BA) <br>
9.6. Criar tela de cadastro de veículos (BA)<br>

### Arquitetura
- Diagrama de Pacotes
![alt text](https://uploaddeimagens.com.br/images/002/536/543/full/DiagramadePacotesArquitetura.png)
