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
    let login = req.body.login
    let idade = req.body.idade
    let endereco = req.body.endereco
    let municipio = req.body.municipio
    let senha = req.body.senha
    db.run(`INSERT INTO Users (nome, login, idade, endereco, municipio, senha) VALUES (?,?,?,?,?,?)`, [nome, login, idade, endereco, municipio, senha], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/usuario/remove', (req, res) => {
    db.run(`DELETE FROM Users WHERE id = ?`, [req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/usuario/edit', (req, res) => {
    db.run(`UPDATE Users SET (nome, login, idade, endereco, municipio, senha) VALUES (?,?,?,?,?,?) WHERE id = ?`, [req.body.nome, req.body.login, req.body.idade, req.body.endereco, req.body.municipio, req.body.uid, req.body.senha], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/paciente', (req, res) => {
    db.all(`SELECT * FROM Pacientes`, (err, rows) => {
        res.send(rows);
    });
});

app.post('/paciente/add', (req, res) => {
    db.run(`INSERT INTO Pacientes (nome, pid, idade, municipio) VALUES (?, ?, ?, ?)`, [req.body.nome, req.body.pid, req.body.idade, req.body.municipio], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/paciente/remove', (req, res) => {
    db.run(`DELETE FROM Pacientes WHERE id = ?`, [req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});
//
app.post('/paciente/edit', (req, res) => {
    db.run(`UPDATE Pacientes SET (nome, idade, municipio) VALUES (?,?,?) WHERE uid = ?`, [req.body.nome, req.body.idade, req.body.municipio, req.body.uid], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/Relatorio', (req, res) => {
    db.all(`SELECT * FROM Relatorios WHERE pid = ? AND usid = ?`, [req.body.pid, req.body.usid], (err, rows) => {
        res.send(rows);
    });
});

app.post('/Relatorio/add', (req, res) => {
    db.run(`INSERT INTO Relatorios (pid, usid, corpo) VALUES (?,?,?)`, [req.body.pid, req.body.usid, req.body.corpo], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/Relatorio/remove', (req, res) => {
    db.run(`DELETE FROM Relatorios WHERE id = ?`, [req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});

app.post('/Relatorio/edit', (req, res) => {
    db.run(`UPDATE Relatorios SET (pid, usid, corpo) VALUES (?,?,?) WHERE id = ?`, [req.body.nome, req.body.idade, req.body.municipio, req.body.id], (err) => {
        if (err) {
            console.error(err.message);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200});
        }
    });
});


//login
app.post('/login', (req, res) => {
    //usuário e senha
    let username = req.body.login
    let password = req.body.senha
    console.log(username)
    if (username && password) {
        sql = `SELECT id FROM Users WHERE login = ? AND senha = ?`
        db.get(sql, [username, password], (err, result) => {
            if (err) {
                console.error(err.message);
                res.send({status: 500, message: err.message});
            } else {
                console.log(result)
                //testa se a linha existe
                if (result) {
                    console.log("Usuario encontrrrado")
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

app.post('/usuario/carregarRegistro', (req, res) => {
    sql = `SELECT * FROM Users WHERE id = ?`
    let userId = req.body.id 
    db.get(sql, [userId], (err, result) => {
        if (err) {
            console.error(err.message)
            res.send({status: 500, message: err.message});
        } else {
            if (result) {
                console.log("Usuario retornado com sucesso")
                res.send(result)
            } else {
                console.log("Usuário não existe")
                res.send({status: 500, message: "Usuário não existe"})
            }             

        }
    })
})


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
