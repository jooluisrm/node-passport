import { Router } from 'express';
import { priveteRoute } from '../config/passport';
import * as ApiController from '../controllers/apiController';

const router = Router();

router.post('/register', ApiController.register);
router.post('/login', priveteRoute, ApiController.login);

router.get('/list', priveteRoute, ApiController.list);

export default router;