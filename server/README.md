Interface para API

/usuario \
Endpoint para lidar com os dados de usuario (psicologos).

/usuario/add \
{
    nome,
    email, 
    idade, 
    endereco, 
    municipio
}
/usuario/remove \
{
    id
}
/usuario/edit \
{
    nome,
    email, 
    idade, 
    endereco, 
    municipio,
    id
}

/paciente \
Endpoint para lidar com os dados de pacientes vinculados a um psicologo.

/paciente/add \
{
    nome, 
    pid, 
    idade, 
    municipio
}
/paciente/remove \
{
    id
}
/paciente/edit \
{
    nome, 
    pid, 
    idade, 
    municipio,    
    id
}

/relatorio
Endpoint para lidar com os dados de relatorios de um paciente. Retorna uma lista de todos os relatorios vinculados a um par de psicologo e paciente.
{
    pid,
    usid
}

/relatorio/add \
{
    pid, 
    usid, 
    corpo
}
/relatorio/remove \
{
    id
}
/relatorio/edit \
{
    pid, 
    usid, 
    corpo,
    id
}