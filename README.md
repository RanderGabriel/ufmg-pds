# Encontre um Mecânico

#### Membros da equipe:
- Augusto Polizer
- Brian Aikau
- Eduardo Oliveira
- Marlon Alves
- Rander Gabriel

#### Funcionalidades do sistema:
Sistema que conecta, em tempo real, mecânicos a motoristas que precisam de um atendimento rápido e seguro de manutenção ou reparo de veículos automotivos. O sistema terá um cadastro de mecânicos, que podem ter uma loja física e informar sua disponibilidade para deslocamento até o veículo com defeito; além de um cadastro de motoristas e informações dos seus respectivos veículos. Demais funcionalidades referem-se a pesquisar, avaliar e exibir perfil do mecânico, calcular deslocamento, tempo de chegada e confirmar solicitação de atendimento.

#### Tecnologia a ser utilizada:
- TypeScript, utilizando Node.js, em back-end.
- Banco de dados MySQL para armazenamento das informações. 
- WebService que será responsável pelo recebimento das requisições, tratamento dos dados e disponibilização do conteúdo requisitado, em formato JSON.
- Front-end com Vue.js e Bootstrap.

### Sprint Planning

1. Como um motorista, eu quero cadastrar meu perfil para ter acesso ao sistema e realizar solicitações de atendimento.</br></br> 
2. Como um motorista, eu quero acessar meu perfil usando as credenciais que defini no cadastro.</br></br> 
3. Como um motorista, eu quero recuperar meus dados de cadastro caso eu esqueça.</br> </br>
4. Como um motorista, eu quero cadastrar os meus veículos para que o mecânico possa ver informações do meu veículo com defeito antes de iniciar o atendimento.</br> </br>
5. Como um mecânico, eu quero cadastrar meu perfil para ter acesso ao sistema e estar apto a realizar atendimentos.</br> </br>
6. Como um mecânico, eu quero acessar meu perfil usando as credenciais que defini no cadastro.</br> </br>
7. Como um mecânico, eu quero recuperar meus dados de cadastro caso eu esqueça.</br> </br>
8. Como um mecânico, eu quero indicar o endereço da minha oficina mecânica e minha disponibilidade para deslocamento, para que o motorista saiba se pode ou não contar com os meus serviços, dependendo da sua localização.</br> </br>
9. Como um mecânico, eu quero cadastrar os meus veículos de trabalho, para que o motorista saiba que em qual veículo estou me deslocando para atendê-lo, quando for o caso.</br>

### Arquitetura
- Diagrama de Pacotes
![alt text](https://uploaddeimagens.com.br/images/002/536/543/full/DiagramadePacotesArquitetura.png)
