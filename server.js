import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ===== BASE DE DATOS EN MEMORIA ===== */

let alumnos = [];
let idCounter = 1;

/* ===== RUTAS ===== */

app.get("/alumnos", (req, res) => {
    res.json(alumnos);
});

app.post("/alumnos", (req, res) => {
    const { nombre, curso } = req.body;

    const nuevoAlumno = {
        id: idCounter++,
        nombre,
        curso
    };

    alumnos.push(nuevoAlumno);

    res.json({ ok: true });
});

app.delete("/alumnos/:id", (req, res) => {
    const id = Number(req.params.id);

    alumnos = alumnos.filter(a => a.id !== id);

    res.json({ ok: true });
});

/* ===== PUERTO RENDER ===== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => 
    console.log(`🔥 Server corriendo en puerto ${PORT}`)
);