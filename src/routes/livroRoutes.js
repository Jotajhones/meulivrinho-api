import { Router } from 'express';
import { livroController } from '../controllers/livroController.js';

const router = Router();

router.get('/', livroController.index);
router.get('/:slug', livroController.show);

// Rotas de Admin (Para o MVP você pode deixar assim, depois adicionamos o middleware de Auth)
router.post('/', livroController.store);
router.put('/:id', livroController.update);
router.delete('/:id', livroController.delete);

export default router;