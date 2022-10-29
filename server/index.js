const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database(__dirname + '\\database\\psionico.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Conectado ao banco de dados.');
});

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log("Conectado");
    res.status(200).send({status: "OK"});
});

app.post('/usuario', (req, res) => {
    let sql = `SELECT * FROM Users`
    db.all(sql, (err, rows) => {
        res.status(200).send(rows);
    });
});

app.post('/usuario/pacientes', (req, res) => {
    let sql = `SELECT * FROM Pacientes WHERE usid = ?`
    let usid = req.body.usid
    db.all(sql, [usid], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({status: 500, message: err.message});
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/usuario/relatorioPorIntervalo', (req, res) => {
    let sql = `SELECT * FROM Relatorios WHERE Relatorios.usid = ? AND (Relatorios.data BETWEEN ? and ?)`
    let usid = req.body.usid
    let inicio = req.body.inicio
    let fim = req.body.fim
    db.all(sql,[usid, inicio, fim], (err, rows) =>{
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/usuario/relatorioPacientePorIntervalo', (req, res) => {
    let sql = `SELECT * FROM Relatorios WHERE Relatorios.usid = ? AND (Relatorios.data BETWEEN ? and ?) AND Relatorios.pid=?`
    let usid = req.body.usid
    let inicio = req.body.inicio
    let fim = req.body.fim
    let paciente = req.body.paciente
    db.all(sql, [usid, inicio, fim, paciente], (err, rows) =>{
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/usuario/pacientes/joinRelatorioPorEstado', (req, res) => {
    let sql = `SELECT * FROM Pacientes INNER JOIN Relatorios ON Pacientes.id=Relatorios.pid WHERE Pacientes.usid = ? AND Pacientes.estado = ?`
    let usid = req.body.usid
    let estado = req.body.estado
    db.all(sql, [usid, estado], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/usuario/pacientes/joinRelatorio', (req, res) => {
    let sql = `SELECT * FROM Pacientes INNER JOIN Relatorios ON Pacientes.id=Relatorios.pid WHERE Pacientes.usid = ?`
    let usid = req.body.usid
    db.all(sql, [usid], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/usuario/paciente/relatorios', (req, res) => {
    let sql = `SELECT * FROM Relatorios WHERE pid = ? AND usid = ?`
    let pid = req.body.pid
    let usid = req.body.usid
    db.all(sql, [pid, usid], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({status: 500, message: err.message});
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/usuario/add', (req, res) => {
    //dados do usuario
    let nome = req.body.nome
    let email = req.body.email
    let estado = req.body.estado
    let municipio = req.body.municipio
    let senha = req.body.senha
    let admin = false
    
    if(req.body.admin) {
         admin = true
    }

    let sqlMail = `SELECT * FROM Users Where email = ?`
    db.all(sqlMail, [email], (err, rows) => {
        if (err) {
            res.status(500).send({message: "Erro ao verificar registros"});
        } 
        else {
            if (rows.length > 0){
                res.status(200).send({emailValido: false});
                return;
            }
            let sql = `INSERT INTO Users (nome, email, estado, municipio, senha, admin) VALUES (?,?,?,?,?,?)`
            db.run(sql, [nome, email, estado, municipio, senha, admin], (err) => {
                if (err) {
                    res.status(500).send({message: err.message});
                } else {
                    res.status(200).send({emailValido: true});
                }
            });
        }
    })
});

app.post('/usuario/remove', (req, res) => {
    let sqlDelete1 = `DELETE FROM Users WHERE id = ?`
    let sqlDelete2 = `DELETE FROM Pacientes WHERE usid = ?`
    let sqlDelete3 = `DELETE FROM Relatorios WHERE usid = ?`
    let id = req.body.id
    db.run(sqlDelete1, [id],)
    .run(sqlDelete2, [id])
    .run(sqlDelete3, [id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send();
        }
    })
});

app.post('/usuario/edit', (req, res) => {
    let sqlSelect = `SELECT * FROM Users Where email = ? AND id != ?`
    let nome = req.body.nome
    let email = req.body.email
    let estado = req.body.estado
    let municipio = req.body.municipio
    let senha = req.body.senha
    let id = req.body.id
    let admin = req.body.admin

    db.all(sqlSelect, [email, id], (err, rows) => {
        if (err) {
            res.status(500).send({ message: "Erro ao verificar registros" });
        }
        else {
            if (rows.length > 0) {
                res.status(200).send({ emailValido: false });
                return;
            }
            let sqlUpdate = `UPDATE Users SET nome = ?, email = ?, senha = ?, estado = ?, municipio = ?, admin = ? WHERE id = ?`
            db.run(sqlUpdate, [nome, email, senha, estado, municipio, admin, id], (err) => {
                if (err) {
                    res.status(500).send({ message: err.message });
                } else {
                    res.status(200).send({ emailValido: true });
                }
            });
        }
    })

});

app.post('/paciente/carregarRegistro', (req, res) => {
    let sql = `SELECT * FROM Pacientes WHERE id = ?`
    let id = req.body.id
    db.all(sql, [id], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/paciente/add', (req, res) => {
    let sql = `INSERT INTO Pacientes (nome, usid, idade, municipio, estado, sexo, genero) VALUES (?, ?, ?, ?, ?, ?, ?)`
    let nome = req.body.nome
    let usid = req.body.usid
    let idade = req.body.idade
    let mun = req.body.municipio
    let estado = req.body.estado
    let sexo = req.body.sexo
    let genero = req.body.genero
    db.run(sql, [nome, usid, idade, mun, estado, sexo, genero], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send();
        }
    });
});

app.post('/paciente/remove', (req, res) => {
    let sqlDelete1 = `DELETE FROM Pacientes WHERE id = ?`
    let sqlDelete2 = `DELETE FROM Relatorios WHERE pid = ?`
    let id = req.body.id
    db.run(sqlDelete1, [id]).run(sqlDelete2, [id], (err) =>{
        if (err) {
             console.error(err.message);
             res.status(500).send({message: err.message});
        }
        else {
             res.status(200).send();
        }
    })
});

app.post('/paciente/removeRelatorios', (req, res) => {
    let sql = `DELETE FROM Relatorios WHERE pid = ?`
    let id = req.body.id
    db.run(sql, [id], (err) => {
        console.log('teste')
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send();
        }
    })   
});

app.post('/paciente/edit', (req, res) => {
    let sql = `UPDATE Pacientes SET nome = ?, idade = ?, estado = ?, sexo = ?, genero = ?, municipio = ? WHERE id = ?`
    let nome = req.body.nome
    let idade = req.body.idade
    let estado = req.body.estado
    let sexo = req.body.sexo
    let genero = req.body.genero
    let mun = req.body.municipio
    let id = req.body.id
    db.run(sql, [nome, idade, estado, sexo, genero, mun, id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send();
        }
    });
});

app.post('/relatorio/carregarRegistro', (req, res) => {
    let sql = `SELECT * FROM Relatorios WHERE id = ?`
    let id = req.body.id
    db.all(sql, [id], (err, rows) => {
        res.status(200).send(rows);
    });
});

app.post('/relatorio/add', (req, res) => {
    let sqlSelect = `SELECT * FROM Relatorios Where data = ? and pid = ? and usid = ?`
    let data = req.body.data
    let pid = req.body.pid
    let usid = req.body.usid
    db.all(sqlSelect, [data, pid, usid], (err, rows) =>{
        if (err) {
            console.error(err.message);
            res.status(500).send({message: "Erro ao verificar registros"});
        } else {
            if (rows.length > 0){
                res.status(200).send({check: true});
            }
        }
        let sqlInsert = `INSERT INTO Relatorios (pid, usid, corpo, aval, data) VALUES (?,?,?,?,?)`
        let corpo = req.body.corpo
        let aval = req.body.aval
        db.run(sqlInsert, [pid, usid, corpo, aval, data], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send({message: err.message});
            } else {
                res.status(200).send();
            }
        });
    })
});

app.post('/relatorio/remove', (req, res) => {
    let sql = `DELETE FROM Relatorios WHERE id = ?`
    let id = req.body.id
    db.run(sql, [id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send();
        }
    });
});

app.post('/relatorio/edit', (req, res) => {
    let sql = `UPDATE Relatorios SET pid = ?, usid = ?, corpo = ?, aval = ?, data = ? WHERE id = ?`
    let pid = req.body.pid
    let usid = req.body.usid
    let corpo = req.body.corpo
    let aval = req.body.aval
    let data = req.body.data
    let id = req.body.id
    db.run(sql, [pid, usid, corpo, aval, data, id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send();
        }
    });
});


//login
app.post('/login', (req, res) => {
    let email = req.body.email
    let senha = req.body.senha
    if (email && senha) {
        let sql = `SELECT * FROM Users WHERE email = ? AND senha = ?`
        db.all(sql, [email, senha], (err, row) => {
            if (err) {
                res.status(500).send({message: err.message});
            } else {
                //testa se a linha existe
                if (row.length > 0) {
                    res.status(200).send(row)
                }
                 else {
                    res.status(200).send('Autenticacao falhou.')
                }   
            }
        })
    } else {
        res.status(200).send('Digite um usuário e senha!')
    }
})

app.post('/usuario/carregarRegistro', (req, res) => {
    let sql = `SELECT * FROM Users WHERE id = ?`
    let userId = req.body.id
    db.get(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send({message: err.message});
        } else {
            if (result) {
                res.status(200).send(result)
            } else {
                res.status(500).send({message: "Usuário não existe"})
            }             
        }
    })
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
