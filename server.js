const express = require("express");
const app = express();
const port = 3000;

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Simulación de una base de datos en memoria
let comments = [];

// Página principal con formulario y comentarios
app.get("/", (req, res) => {
    res.render("index", { comments });
});

/*
function escapeHTML(str) {
return str.replace(/[&<>"']/g, function (char) {
    const escapeChars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return escapeChars[char];
});
}

app.get("/xss", (req, res) => {
    const message = escapeHTML(req.query.msg || "");
    res.send(`<h1>Mensaje recibido:</h1><p>${message}</p>`);
});
*/

app.get("/xss", (req, res) => {
    const message = req.query.msg || ""; // Obtiene el parámetro "msg" de la URL
    res.send(`<h1>Mensaje recibido:</h1><p>${message}</p>`);
});


// Ruta para recibir comentarios (sin sanitización, vulnerable a XSS)
app.post("/comment", (req, res) => {
    const userComment = req.body.comment;
    comments.push(userComment); // Se almacena sin validación, permitiendo XSS
    res.redirect("/");
});

// Ruta para eliminar todos los comentarios
app.post("/delete", (req, res) => {
    comments = []; // Vacía la lista de comentarios
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

