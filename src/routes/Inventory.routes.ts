import { Router } from 'express';
import { inventoryController } from '../controllers/Inventory.controller';
import multer from '../lib/multer';
import { userController } from '../controllers/User.controller';

const router = Router();

router.get(
	'/inventory/:id',
	userController.token,
	inventoryController.getInventoryById
);
router.get(
	'/tools/:busqueda',
	userController.token,
	inventoryController.search
);
router.get('/inventorys', inventoryController.getInventarios);
router.get('/image/:img', inventoryController.getImage);
router.post(
	'/add-inventory',
	userController.token,
	inventoryController.saveTool
);
router.put('/update-inventory', inventoryController.updateTool);
router.put(
	'/image-upload/:id',
	userController.token,
	multer.single('image'),
	inventoryController.uploadImage
);
router.put(
	'/delete-inventory',
	userController.token,
	inventoryController.deleteTools
);

// router.post('/upload/:tipo/:id', inventoryController.uploadImage);

export default router;
