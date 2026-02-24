import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const db = new sqlite3.Database("./database.db");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

db.run(`
CREATE TABLE IF NOT EXISTS alumnos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    curso TEXT
)
`);

app.get("/alumnos", (req, res) => {
    db.all("SELECT * FROM alumnos", [], (err, rows) => {
        res.json(rows);
    });
});

app.post("/alumnos", (req, res) => {
    const { nombre, curso } = req.body;
    db.run("INSERT INTO alumnos (nombre, curso) VALUES (?, ?)", [nombre, curso]);
    res.json({ ok: true });
});

app.delete("/alumnos/:id", (req, res) => {
    db.run("DELETE FROM alumnos WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
});

app.listen(3000, () => console.log("🔥 Server corriendo en puerto 3000"));