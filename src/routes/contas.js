import { Router } from "express";
import contasController from "../controllers/contas.js";
import { middlewareAutenticacao } from '../middleware/auth.js';

const router = Router();

router.get("/contas", middlewareAutenticacao, contasController.contasGet);
router.post("/contas", middlewareAutenticacao, contasController.contasPost);
router.put("/contas/:id", middlewareAutenticacao, contasController.contasPut);
router.delete("/contas/:id", middlewareAutenticacao, contasController.contasDelete);

export default router;