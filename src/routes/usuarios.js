import { Router } from "express";
import usersController from "../controllers/usuarios.js";
import { middlewareAutenticacao } from '../middleware/auth.js';

const router = Router();

router.get("/usuarios", middlewareAutenticacao, usersController.usuariosGet);
router.post("/usuarios", middlewareAutenticacao, usersController.usuariosPost);
router.put("/usuarios/:id", middlewareAutenticacao, usersController.usuariosPut);
router.delete("/usuarios/:id", middlewareAutenticacao, usersController.usuariosDelete);

export default router;