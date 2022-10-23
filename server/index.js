const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');

// db.all(`SELECT * FROM Users`, [], (err, rows) => {
//     if (err) return console.error(err.message);

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
    db.all(`SELECT * FROM Users`, (err, rows) => {
        res.status(200).send(rows);
    });
});

// app.post('/usuario/carregarRegistro', (req, res) => {
//     db.all(`SELECT * FROM Users WHERE id = ?`, [req.body.id], (err, rows) => {
//         res.status(200).send(rows);
//     });
// });

app.post('/usuario/pacientes', (req, res) => {
    db.all(`SELECT * FROM Pacientes WHERE usid = ?`, [req.body.usid], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({status: 500, message: err.message});
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/usuario/relatorioPorIntervalo', (req, res) => {
    db.all(`SELECT * FROM Relatorios WHERE Relatorios.usid = ? AND (Relatorios.data BETWEEN ? and ?)`,[req.body.usid,req.body.inicio, req.body.fim], (err, rows) =>{
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/usuario/pacientes/joinRelatorioPorEstado', (req, res) => {
    db.all(`SELECT * FROM Pacientes INNER JOIN Relatorios ON Pacientes.id=Relatorios.pid WHERE Pacientes.usid = ? AND Pacientes.estado = ?`, [req.body.usid, req.body.estado], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/usuario/pacientes/joinRelatorio', (req, res) => {
    db.all(`SELECT * FROM Pacientes INNER JOIN Relatorios ON Pacientes.id=Relatorios.pid WHERE Pacientes.usid = ?`, [req.body.usid], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/usuario/paciente/relatorios', (req, res) => {
    db.all(`SELECT * FROM Relatorios WHERE pid = ? AND usid = ?`, [req.body.pid, req.body.usid], (err, rows) => {
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
    db.all(`SELECT * FROM Users Where email = ?`, [email], (err, rows) => {
        if (err) {
            res.status(500).send({message: "Erro ao verificar registros"});
        } 
        else {
            if (rows.length > 0){
                res.status(200).send({emailValido: false});
                return;
            }
            db.run(`INSERT INTO Users (nome, email, estado, municipio, senha, admin) VALUES (?,?,?,?,?,?)`, [nome, email, estado, municipio, senha, admin], (err) => {
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
    db.run(`DELETE FROM Users WHERE id = ?`, [req.body.id],)
    .run(`DELETE FROM Pacientes WHERE usid = ?`, [req.body.id])
    .run(`DELETE FROM Relatorios WHERE usid = ?`, [req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send();
        }
    })
});

app.post('/usuario/edit', (req, res) => {
    db.run(`UPDATE Users SET nome = ?, email = ?, senha = ?, estado = ?, municipio = ? WHERE id = ?`, [req.body.nome, req.body.email, req.body.senha, req.body.estado, req.body.municipio, req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send(req.body);
        }
    });
});

app.post('/paciente/carregarRegistro', (req, res) => {
    db.all(`SELECT * FROM Pacientes WHERE id = ?`, [req.body.id], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send();
        }
    });
});

app.post('/paciente/add', (req, res) => {
    db.run(`INSERT INTO Pacientes (nome, usid, idade, municipio, estado, sexo, genero) VALUES (?, ?, ?, ?, ?, ?, ?)`, [req.body.nome, req.body.usid, req.body.idade, req.body.municipio, req.body.estado, req.body.sexo, req.body.genero], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send();
        }
    });
});

app.post('/paciente/remove', (req, res) => {
    db.run(`DELETE FROM Pacientes WHERE id = ?`, [req.body.id]).run(`DELETE FROM Relatorios WHERE pid = ?`, [req.body.id], (err) =>{
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
    db.run(`DELETE FROM Relatorios WHERE pid = ?`, [req.body.id], (err) => {
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
    db.run(`UPDATE Pacientes SET nome = ?, idade = ?, estado = ?, sexo = ?, genero = ?, municipio = ? WHERE id = ?`, [req.body.nome, req.body.idade, req.body.estado, req.body.sexo, req.body.genero, req.body.municipio, req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send();
        }
    });
});

app.post('/relatorio/carregarRegistro', (req, res) => {
    db.all(`SELECT * FROM Relatorios WHERE id = ?`, [req.body.id], (err, rows) => {
        res.status(200).send(rows);
    });
});

app.post('/relatorio/add', (req, res) => {
    db.all(`SELECT * FROM Relatorios Where data = ? and pid = ? and usid = ?`, [req.body.data, req.body.pid, req.body.usid], (err, rows) =>{
        if (err) {
            console.error(err.message);
            res.status(500).send({message: "Erro ao verificar registros"});
        } else {
            if (rows.length > 0){
                res.status(200).send({check: true});
            }
        }
        db.run(`INSERT INTO Relatorios (pid, usid, corpo, aval, data) VALUES (?,?,?,?,?)`, [req.body.pid, req.body.usid, req.body.corpo, req.body.aval, req.body.data], (err) => {
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
    db.run(`DELETE FROM Relatorios WHERE id = ?`, [req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({message: err.message});
        } else {
            res.status(200).send();
        }
    });
});

app.post('/relatorio/edit', (req, res) => {
    db.run(`UPDATE Relatorios SET pid = ?, usid = ?, corpo = ?, aval = ?, data = ? WHERE id = ?`, [req.body.pid, req.body.usid, req.body.corpo, req.body.aval, req.body.data, req.body.id], (err) => {
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
        sql = `SELECT * FROM Users WHERE email = ? AND senha = ?`
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
    sql = `SELECT * FROM Users WHERE id = ?`
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
