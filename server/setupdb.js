const sqlite3 = require('sqlite3');

let db = new sqlite3.Database(__dirname + '\\database\\psionico.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Conectado ao banco de dados.');
});

db.run(`CREATE TABLE Users (
        id INTEGER PRIMARY KEY ASC,
        nome TEXT,
        email TEXT UNIQUE,
        senha TEXT,
        municipio TEXT,
        estado TEXT,
        admin BOOL
        )`);

db.run(`CREATE TABLE Pacientes (
    id INTEGER PRIMARY KEY ASC,
    usid INTEGER,
    nome TEXT,
    idade INTEGER,
    municipio TEXT,
    estado TEXT,
    sexo CHAR(1),
    genero TEXT
    )`);

db.run(`CREATE TABLE Relatorios (
    id INTEGER PRIMARY KEY ASC,
    usid INTEGER,
    pid INTEGER,
    aval INTEGER,
    data DATE,
    corpo TEXT
    )`);

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Desconectado do banco de dados.")
});