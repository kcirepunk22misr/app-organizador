import { Router } from 'express';
import { locationController } from '../controllers/Location.controller';

const routes = Router();

routes.get('/locacions', locationController.getLocations);
routes.post('/add-location', locationController.saveLocation);
export default routes;
