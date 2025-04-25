# SegundoProyectoBackend

---

## Tecnologias usadas

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- CORS
- express-validator

---

## instalacion de dependencias

npm install express mongoose dotenv cors express-validator

npm install bcryptjs jsonwebtoken

---

## Dependencias

express: Permite importar express y configurar un servidor basico

mongoose: Libreria para conectarse y trabajar con MongoDB usando modelos

dotenv: Permite cargar variables de entorno desde un archivo .env

cors: Permite solicitudes desde otros orígenes (cross-origin)

express.json(): Permite recibir datos tipo JSON en las solicitudes

---

## .env

MONGO_URI=mongodb://localhost:27017/SegundoProyectoBackend

---

## Ejecucion

node app.js
localhost:3000

---

## Endpoints

Rutas:
      - Api Rest usuarios       ->     <http://localhost:3000/api/usuarios>

        POST     ->   localhost:3000/api/usuarios/crear               ->    Crea un nuevo usuario
        GET      ->   localhost:3000/api/usuarios/obtener             ->    Obtiene todos los usuarios
        GET      ->   localhost:3000/api/usuarios/obtener/:id         ->    Obtiene un usuario por ID
        PUT      ->   localhost:3000/api/usuarios/actualizar/:id      ->    Actualiza un usuario por ID
        DELETE   ->   localhost:3000/api/usuarios/eliminar/:id        ->    Elimina un usuario por ID
        PUT      ->   localhost:3000/api/usuarios/actualizar-roles    ->    Actualiza todos los roles por ID mediante una unica solicitud

      - Api Rest partidos       ->     <http://localhost:3000/api/partidos>

        POST    -> localhost:3000/api/partidos/crear            ->   Crea un nuevo partido
        GET     -> localhost:3000/api/partidos/obtener          ->   Obtiene todos los partidos
        GET     -> localhost:3000/api/partidos/obtener/:id      ->   Obtiene un partido por ID
        PUT     -> localhost:3000/api/partidos/actualizar/:id   ->   Actualiza un partido por ID
        DELETE  -> localhost:3000/api/partidos/eliminar/:id     ->   Elimina un partido por ID
        DELETE  -> localhost:3000/api/partidos/eliminar         ->   Elimina todos los partidos por ID mediante una unica solicitud

      - Api Rest estadisticas   ->     <http://localhost:3000/api/estadisticas>

        POST    -> localhost:3000/api/estadisticas/crear         -> Crea estadísticas para un jugador
        GET     -> localhost:3000/api/estadisticas/obtener       -> Obtiene todas las estadísticas de jugadores
        GET     -> localhost:3000/api/estadisticas/obtener/:id   -> Obtiene estadísticas de un jugador por ID de jugador
        PUT     -> localhost:3000/api/estadisticas/actualizar/:id -> Actualiza estadísticas por ID de estadistica
        DELETE  -> localhost:3000/api/estadisticas/eliminar/:id  -> Elimina estadísticas de un jugador por ID de estadistica
        DELETE  -> localhost:3000/api/estadisticas/eliminar      -> Elimina todas las estadísticas de jugadores por ID mediante una unica solicitud
