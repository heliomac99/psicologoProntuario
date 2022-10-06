Interface para API

### ``` /usuario ``` 
Endpoint para lidar com os dados de usuario (psicologos).

#### ``` /usuario/add ``` 
    {
        nome: string, 
        email: string,
        senha: string 
        idade: integer, 
        endereco: string,  
        municipio: string,  
        estado: string 
    }
#### ``` /usuario/remove ``` 
    {
        id: integer
    } 
#### ``` /usuario/edit ``` 
    {
        nome: string,
        email: string, 
        senha: string,
        idade: integer, 
        endereco: string, 
        municipio: string,
        estado: string,
        id: integer
    } 

#### ``` /usuario/pacientes ``` 
Retorna uma lista de todos os pacientes vinculados a um psicologo.

    {
        usid: integer
    }
    
***usid***: Identificador do usuario vinculado ao paciente.
#### ``` /usuario/paciente/relatorios ``` 
Retorna uma lista de todos os relatorios vinculados a um par de psicologo e paciente. \

    {
        pid: integer,
        usid: integer
    } 

***pid***: Identificador do paciente vinculado ao relatorio.
***usid***: Identificador do usuario vinculado ao relatorio.
### ``` /paciente ``` 
Endpoint para lidar com os dados de pacientes vinculados a um psicologo.

#### ``` /paciente/add ``` 
    {
        nome: string, 
        usid: integer, 
        idade: integer, 
        estado: string,
        sexo: string,
        genero: string
    } 
***usid***: Identificador do usuario que atende esse paciente.
***estado***: Sigla do estado onde o paciente e atendido.
#### ``` /paciente/remove ```
    {
        id: integer
    } 
#### ```/paciente/edit ```
    {
        nome: string, 
        id: integer, 
        idade: integer,
        sexo: string,
        genero: string,
        estado: string,
    } 

#### ``` /relatorio ```
Endpoint para lidar com os dados de relatorios de um paciente. 

#### ``` /relatorio/add ```
    {
        pid: integer, 
        usid: integer, 
        corpo: string,
        aval: integer
    } 
***pid***: Identificador do paciente vinculado ao relatorio.
***usid***: Identificador do usuario vinculado ao relatorio.
***aval***: Inteiro referente a classificacao do paciente. (1-3)
#### ``` /relatorio/remove ```
    {
        id: integer
    } 
#### ``` /relatorio/edit ```
    {
        pid: integer, 
        usid: integer, 
        corpo: string,
        id: integer
    } 
***pid***: Identificador do paciente vinculado ao relatorio.
***usid***: Identificador do usuario vinculado ao relatorio.

#### ``` /login ```
    {
        email: string,
        senha: string
    }