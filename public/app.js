const API_URL = "https://sistema-ia-2.onrender.com";

/* =========================
   GUARDAR ALUMNO + VALIDACIÓN
========================= */

async function guardar() {
    const nombre = document.getElementById("nombre").value.trim();
    const curso = document.getElementById("curso").value.trim();
    const error = document.getElementById("error");

    if (!nombre || !curso) {
        error.innerText = "⚠️ Completa todos los campos";
        return;
    }

    if (nombre.length < 3) {
        error.innerText = "⚠️ El nombre debe tener al menos 3 caracteres";
        return;
    }

    error.innerText = "";

    await fetch(`${API_URL}/alumnos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, curso })
    });

    limpiarFormulario();
    cargar();
}

/* =========================
   CARGAR + FILTRO
========================= */

async function cargar() {
    const cursoFiltro = document.getElementById("filtro").value;

    const res = await fetch(`${API_URL}/alumnos`);
    const alumnos = await res.json();

    const filtrados = cursoFiltro
        ? alumnos.filter(a => a.curso === cursoFiltro)
        : alumnos;

    document.getElementById("lista").innerHTML = filtrados.map(a => `
        <div class="flex justify-between bg-slate-700 p-2 rounded">
            <span>${a.nombre} - ${a.curso}</span>

            <div class="flex gap-2">
                <button onclick="editar(${a.id}, '${a.nombre}', '${a.curso}')">
                    ✏️
                </button>

                <button onclick="borrar(${a.id})">
                    ❌
                </button>
            </div>
        </div>
    `).join("");
}

/* =========================
   BORRAR
========================= */

async function borrar(id) {
    await fetch(`${API_URL}/alumnos/${id}`, {
        method: "DELETE"
    });

    cargar();
}

/* =========================
   EDITAR
========================= */

function editar(id, nombre, curso) {

    document.getElementById("nombre").value = nombre;
    document.getElementById("curso").value = curso;

    const btn = document.getElementById("btnGuardar");
    btn.innerText = "Actualizar alumno";

    btn.onclick = async () => {

        const nuevoNombre = document.getElementById("nombre").value.trim();
        const nuevoCurso = document.getElementById("curso").value.trim();
        const error = document.getElementById("error");

        if (!nuevoNombre || !nuevoCurso) {
            error.innerText = "⚠️ Completa todos los campos";
            return;
        }

        error.innerText = "";

        await fetch(`${API_URL}/alumnos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: nuevoNombre,
                curso: nuevoCurso
            })
        });

        btn.innerText = "Guardar alumno";
        btn.onclick = guardar;

        limpiarFormulario();
        cargar();
    };
}

/* =========================
   LIMPIAR FORMULARIO
========================= */

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("curso").value = "";
}

/* =========================
   CLIMA
========================= */

const API_KEY = "c994346ab2c3cbe94efa69fe447a97d6"; // 👈 si querés mantener clima

async function clima(ciudad = "Buenos Aires") {

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${API_KEY}&units=metric&lang=es`
    );

    const data = await res.json();

    if (data.cod !== 200) {
        document.getElementById("clima").innerHTML = `
            <div class="bg-red-500 p-3 rounded-xl mt-4">
                ❌ Ciudad no encontrada
            </div>
        `;
        return;
    }

    document.getElementById("clima").innerHTML = `
        <div class="bg-slate-700 p-3 rounded-xl mt-4">
            🌤️ ${data.name}<br>
            🌡️ ${data.main.temp}°C<br>
            ${data.weather[0].description}
        </div>
    `;
}

function buscarClima() {
    const ciudad = document.getElementById("ciudad").value;
    clima(ciudad);
}

/* =========================
   INICIALIZACIÓN
========================= */

cargar();
clima();