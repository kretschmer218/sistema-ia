async function guardar() {
    const nombre = document.getElementById("nombre").value;
    const curso = document.getElementById("curso").value;

    await fetch("http://localhost:3000/alumnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, curso })
    });

    cargar();
}

async function cargar() {
    const res = await fetch("http://localhost:3000/alumnos");
    const alumnos = await res.json();

    document.getElementById("lista").innerHTML = alumnos.map(a => `
        <div class="flex justify-between bg-slate-700 p-2 rounded mt-2">
            ${a.nombre} - ${a.curso}
            <button onclick="borrar(${a.id})">❌</button>
        </div>
    `).join("");
}

async function borrar(id) {
    await fetch(`http://localhost:3000/alumnos/${id}`, { method: "DELETE" });
    cargar();
}

cargar();

const API_KEY = "c994346ab2c3cbe94efa69fe447a97d6";

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

clima();