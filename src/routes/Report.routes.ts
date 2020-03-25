import { Router } from 'express';
import { reportController } from '../controllers/Report.controller';
import { userController } from '../controllers/User.controller';

const router = Router();

router.get('/reports/:id', reportController.getReport);
router.put('/update-state-report', reportController.updateState);
router.put('/update-report', reportController.updateReport);

export default router;