# Escopo do Sistema
Sistema de registro e acompanhamento de clientes para psicólogos cadastrados.
# Features do Sistema
* Registro e login para cada psicólogo
* Criação e atualização de registros de clientes no banco de dados por psicólogos cadastrados
* Possibilidade de transferencia do registro de um cliente entre psicologos
* Dashboard para visualização dos dados dos pacientes
# Membros do Time
* Átila Augusto
* Davi Lage
* Hélio Martins
* Thales Henrique
# Tecnologias
* NodeJS, HTML, CSS, SQLite, Vue

- Tarefas Tecnicas
	- Criar ambiente de desenvolvimento do frontend [Helio]
	- Preparar ambiente de desenvolvimento (Node.js, Dependencias) [Atila, Davi, Helio, Thales]
	- Discutir e criar esquema do banco de dados [Atila, Davi, Helio, Thales]
	- Criar banco de dados [Davi]

- Historia: Como psicologo, eu quero me cadastrar no sistema
- Tarefas:
	- Projetar e testar a interface de login [Atila]
	- Projetar e testar a interface do psicologo [Helio]
	- Criar e testar endpoint para cadastro [Davi]
	- Criar e testar endpoint para login [Thales]
	- Criar e testar camada de autenticacao [Davi]

- Historia: Como psicologo, eu quero gerenciar meus pacientes
- Tarefas:
	- Projetar e testar a interface de cadastro de paciente [Helio]
	- Projetar e testar a interface de edicao dos dados de paciente [Helio e Atila]
	- Projetar e testar a interface de acompanhamento do paciente [Helio e Atila]
	- Projetar e testar o mecanismo de transferencia do paciente [Atila]
	- Criar e testar endpoint para cadastro de paciente [Thales]
	- Criar e testar endpoint para recuperacao dos dados de paciente [Davi]
	- Criar e testar endpoint para atualizacao dos dados de paciente [Davi]
	- Criar e testar endpoint para transferencia dos dados de paciente [Thales]
	- Criar e testar camada de autenticacao [Davi]

- Historia: Como psicologo, eu quero gerenciar os meus relatorios
- Tarefas:
	- Projetar e testar a interface de criacao de relatorio [Helio]
	- Projetar e testar a interface de edicao de relatorio [Helio]
	- Projetar e testar a interface de remocao de relatorio [Helio]
	- Criar e testar endpoint para cadastro de relatorio [Thales]
	- Criar e testar endpoint para recuperacao dos dados de relatorio [Davi]
	- Criar e testar endpoint para atualizacao dos dados de relatorio [Davi]
	- Criar e testar camada de autenticacao [Thales]
