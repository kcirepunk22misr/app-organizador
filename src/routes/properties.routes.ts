import { Router } from 'express';
import { propertiesController } from '../controllers/Properties.controller';
import { userController } from '../controllers/User.controller';

const router = Router();

// Tipos Routes
router.get('/types', propertiesController.getTypes);
router.post('/add-type', userController.token, propertiesController.saveType);
router.delete('/delete-type/:id', propertiesController.deleteType);

// Grupos Routes
router.get('/groups', propertiesController.getGroup);
router.post('/add-group', userController.token, propertiesController.saveGroup);
router.delete('/delete-group/:id', propertiesController.deleteGroup);

// Marcas Routes
router.get('/marcas', propertiesController.getMarcas);
router.post('/add-marca', userController.token, propertiesController.saveMarca);
router.delete('/depete-marca/:id', propertiesController.deleteMarca);

// Estado Routes
router.get('/states', propertiesController.getStates);
router.post('/add-state', userController.token, propertiesController.saveState);
router.delete('/delete-state/:id', propertiesController.deleteState);

// Tamaños Routes
router.get('/sizes', propertiesController.getSizes);
router.post('/add-size', userController.token, propertiesController.saveSize);
router.delete('/delete-size/:id', propertiesController.deleteSize);

// Color Routes
router.get('/colors', propertiesController.getColors);
router.post('/add-color', userController.token, propertiesController.saveColor);
router.delete('/delete-color/:id', propertiesController.deleteColor);

export default router;
