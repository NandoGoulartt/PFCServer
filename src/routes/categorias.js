import { Router } from "express";
import categoriasController from "../controllers/categorias.js";
import { middlewareAutenticacao } from '../middleware/auth.js';

const router = Router();

router.get("/categorias", middlewareAutenticacao, categoriasController.categoriasGet);
router.post("/categorias", middlewareAutenticacao, categoriasController.categoriasPost);
router.put("/categorias/:id", middlewareAutenticacao, categoriasController.categoriasPut);
router.delete("/categorias/:id", middlewareAutenticacao, categoriasController.categoriasDelete);

export default router;