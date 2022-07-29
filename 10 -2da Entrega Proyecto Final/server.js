import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express()
const puerto = process.env.PUERTO  //en archivo de ambiente

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "../public")));

import rutas from "./src/routes/index.js";
app.use("/api", rutas);




app.listen(puerto, ()=>{
    console.log("servidor escuchando el puerto 8080");
})