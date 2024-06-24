import express from "express";
import { db } from "./src/model/db.js";
import usuariosRouter from "./src/routes/usuarios.js"
import contasRouter from "./src/routes/contas.js"
import categoriasRouter from "./src/routes/categorias.js"
import lancamentosRouter from "./src/routes/lancamentos.js"
import authRouter from "./src/routes/auth.js"
import cors from "cors"

const app = express();
app.use(cors());
const port = 3001;
app.use(express.json());
db()
app.use(usuariosRouter)
app.use(contasRouter)
app.use(categoriasRouter)
app.use(lancamentosRouter)
app.use(authRouter)
app.listen(port, () => {
  console.log(`Server rodando em http://localhost:${port}/`);
});
