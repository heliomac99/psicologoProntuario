const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');

// db.all(`SELECT * FROM Users`, [], (err, rows) => {
//     if (err) return console.error(err.message);

//     rows.forEach((row) => {
//         console.log(row);
//     });
// });

// db.close();
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

app.post('/usuario/add', (req, res) => {
    db.run(`INSERT INTO Users (nome, email, idade, endereco, municipio) VALUES (?,?,?,?,?)`, [req.body.nome, req.body.email, req.body.idade, req.body.endereco, req.body.municipio], (err) => {
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
    exec_sql(`UPDATE Users SET (nome, login, idade, endereco, municipio) VALUES (?,?,?,?,?) WHERE uid = ?`, [req.body.nome, req.body.login, req.body.idade, req.body.endereco, req.body.municipio, req.body.uid]);
});

app.post('/paciente', (req, res) => {
    res.send(exec_sql(`SELECT * FROM Pacientes`))
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

app.post('/paciente/edit', (req, res) => {
    exec_sql(`UPDATE Pacientes SET (nome, idade, municipio) VALUES (?,?,?) WHERE uid = ?`, [req.body.nome, req.body.idade, req.body.municipio, req.body.uid]);
});

app.post('/Relatorio', (req, res) => {
    res.send(exec_sql(`SELECT * FROM Relatorios`))
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
    exec_sql(`DELETE FROM Relatorios WHERE uid = ?`, [req.body.uid]);
});

app.post('/Relatorio/edit', (req, res) => {
    exec_sql(`UPDATE Relatorios SET (pid, usid, corpo) VALUES (?,?,?) WHERE uid = ?`, [req.body.nome, req.body.idade, req.body.municipio, req.body.uid]);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
