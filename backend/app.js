const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// Conexion a la base de datos con mongoose:

  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
  const DATABASE_NAME = "SegundoProyectoBackend";

  console.log("Conectando a MongoDB en:", MONGO_URI);
  console.log("Usando la base de datos:", DATABASE_NAME);

  mongoose.connect(process.env.MONGO_URI, {
    dbName: DATABASE_NAME
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));


 
  const usuarioRouters = require("./routes/usuarioRouters");
  app.use("/api/usuarios", usuarioRouters);

  const partidoRouters = require("./routes/partidoRouters");
  app.use("/api/partidos", partidoRouters);

  const estadisticasJugadorRouters = require("./routes/estadisticasJugadorRouters");
  app.use("/api/estadisticas", estadisticasJugadorRouters);


app.listen(port, () => {
  console.log(`Servidor funcionando por el puerto:${port}`);
})

