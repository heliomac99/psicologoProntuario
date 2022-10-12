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
    res.send({status: "OK"});
});

app.post('/usuario', (req, res) => {
    db.all(`SELECT * FROM Users`, (err, rows) => {
        res.send(rows);
    });
});

app.post('/usuario/carregarRegistro', (req, res) => {
    db.all(`SELECT * FROM Users WHERE id = ?`, [req.body.id], (err, rows) => {
        res.send(rows);
    });
});

app.post('/usuario/pacientes', (req, res) => {
    db.all(`SELECT * FROM Pacientes WHERE usid = ?`, [req.body.usid], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send(rows);
        }
    });
});

app.post('/usuario/pacientes/joinRelatorioPorEstado', (req, res) => {
    db.all(`SELECT * FROM Pacientes INNER JOIN Relatorios ON Pacientes.id=Relatorios.pid WHERE Pacientes.usid = ? AND Pacientes.estado = ?`, [req.body.usid, req.body.estado], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send(rows);
        }
    });
});

app.post('/usuario/pacientes/joinRelatorio', (req, res) => {
    db.all(`SELECT * FROM Pacientes INNER JOIN Relatorios ON Pacientes.id=Relatorios.pid WHERE Pacientes.usid = ?`, [req.body.usid], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send(rows);
        }
    });
});

app.post('/usuario/paciente/relatorios', (req, res) => {
    db.all(`SELECT * FROM Relatorios WHERE pid = ? AND usid = ?`, [req.body.pid, req.body.usid], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send(rows);
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
    db.run(`INSERT INTO Users (nome, email, estado, municipio, senha) VALUES (?,?,?,?,?)`, [nome, email, estado, municipio, senha], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/usuario/remove', (req, res) => {
    db.run(`DELETE FROM Users WHERE id = ?`, [req.body.id],)
    .run(`DELETE FROM Pacientes WHERE usid = ?`, [req.body.id])
    .run(`DELETE FROM Relatorios WHERE usid = ?`, [req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    })
});

app.post('/usuario/edit', (req, res) => {
    db.run(`UPDATE Users SET nome = ?, email = ? estado = ?, municipio = ?, senha = ? WHERE id = ?`, [req.body.nome, req.body.email, req.body.estado, req.body.municipio, req.body.senha, req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/paciente/carregarRegistro', (req, res) => {
    db.all(`SELECT * FROM Pacientes WHERE id = ?`, [req.body.id], (err, rows) => {
        res.send(rows);
    });
});

app.post('/paciente/add', (req, res) => {
    db.run(`INSERT INTO Pacientes (nome, usid, idade, municipio, estado, sexo, genero) VALUES (?, ?, ?, ?, ?, ?, ?)`, [req.body.nome, req.body.usid, req.body.idade, req.body.municipio, req.body.estado, req.body.sexo, req.body.genero], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/paciente/remove', (req, res) => {
    db.run(`DELETE FROM Pacientes WHERE id = ?`, [req.body.id]).run(`DELETE FROM Relatorios WHERE pid = ?`, [req.body.id], (err) =>{
        if (err) {
             console.error(err.message);
             res.send({status: 500, message: err.message});
        }
        else {
             res.send({status: 200});
        }
    })
});

app.post('/paciente/removeRelatorios', (req, res) => {
    db.run(`DELETE FROM Relatorios WHERE pid = ?`, [req.body.id], (err) => {
        console.log('teste')
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    })   
});

app.post('/paciente/edit', (req, res) => {
    db.run(`UPDATE Pacientes SET nome = ?, idade = ?, estado = ?, sexo = ?, genero = ?, municipio = ? WHERE id = ?`, [req.body.nome, req.body.idade, req.body.estado, req.body.sexo, req.body.genero, req.body.municipio, req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/relatorio/carregarRegistro', (req, res) => {
    db.all(`SELECT * FROM Relatorios WHERE id = ?`, [req.body.id], (err, rows) => {
        res.send(rows);
    });
});

app.post('/relatorio/add', (req, res) => {
    db.run(`INSERT INTO Relatorios (pid, usid, corpo, aval, data) VALUES (?,?,?,?,?)`, [req.body.pid, req.body.usid, req.body.corpo, req.body.aval, req.body.data], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/relatorio/remove', (req, res) => {
    db.run(`DELETE FROM Relatorios WHERE id = ?`, [req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});


app.post('/relatorio/edit', (req, res) => {
    db.run(`UPDATE Relatorios SET pid = ?, usid = ?, corpo = ?, aval = ?, data = ? WHERE id = ?`, [req.body.pid, req.body.usid, req.body.corpo, req.body.aval, req.body.data, req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});


//login
app.post('/login', [req.body.login, req.body.senha], (req, res) => {
    let username = req.body.login
    let password = req.body.senha
    if (username && password) {
        sql = `SELECT id FROM Users WHERE login = ? AND senha = ?`
        db.get(sql, [username, password], (err, result) => {
            if (err) {
                res.send({status: 500, message: err.message});
            } else {
                //testa se a linha existe
                if (result) {
                    res.send({status: 200});
                } else {
                    console.log("Senha ou usuário incorretos")
                    res.send({status: 500, message: "Senha ou usuário incorretos"});
                }   
            }
        })
    } else {
        res.send('Digite um usuário e senha!')
    }
})

//retorna registro do usuário

// app.post('/usuario/carregarRegistro', (req, res) => {
//     sql = `SELECT * FROM Users WHERE id = ?`
//     let userId = req.body.id 
//     db.get(sql, [userId], (err, result) => {
//         if (err) {
//             console.error(err.message)
//             res.send({status: 500, message: err.message});
//         } else {
//             if (result) {
//                 console.log("Usuario retornado com sucesso")
//                 res.send(result)
//             } else {
//                 console.log("Usuário não existe")
//                 res.send({status: 500, message: "Usuário não existe"})
//             }             

//         }
//     })
// })


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
