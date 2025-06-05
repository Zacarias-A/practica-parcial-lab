const express = require("express");
const app = express();
app.use(express.json());
const clientes = require("./src/data/clientes.json");
const reglas = require("./src/reglas/reglas-direcciones.js");
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("La aplicación inició...");
});
const mapperSimple = (usuario)=>({"Nombre": usuario.nombre, "Email": usuario.email});
const filtro = (clientes, valido = true)=> valido?clientes.filter(c=>reglas.every(r=>r.fn(c.direccion)))
:clientes.filter(c=>reglas.some(r=>!r.fn(c.direccion)) );
app.get("/direcciones-validas", (req, res)=>{
    const validas = filtro(clientes).map(c=>mapperSimple(c));
    res.status(200).json(validas);
});
app.get("/direcciones-invalidas", (req, res)=>{
    const noValidas = filtro(clientes, false).map(c=>mapperSimple(c));
    res.status(200).json(noValidas);
});