import { Router } from 'express';
import { userController } from '../controllers/User.controller';

const router = Router();

router.get(
	'/users',
	[userController.token, userController.verificarAdmin],
	userController.getUsers
);
router.post(
	'/add-user',
	[userController.token, userController.verificarAdmin],
	userController.saveUser
);
router.post('/login', userController.login);

export default router;
