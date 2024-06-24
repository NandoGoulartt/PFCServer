import { Router } from "express";
import lancamentosController from "../controllers/lancamentos.js";
import { middlewareAutenticacao } from '../middleware/auth.js';

const router = Router();

router.get("/lancamentos", middlewareAutenticacao, lancamentosController.lancamentoGet);
router.get("/lancamentosvencidos", middlewareAutenticacao, lancamentosController.lancamentoVencidosGet);
router.post("/lancamentos", middlewareAutenticacao, lancamentosController.lancamentoPost);
router.put("/lancamentos/:id", middlewareAutenticacao, lancamentosController.lancamentoPut);
router.delete("/lancamentos/:id", middlewareAutenticacao, lancamentosController.lancamentoDelete);

export default router;