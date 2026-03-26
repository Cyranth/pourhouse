import { Router } from 'express';
import * as adminWineController from '../controllers/adminWineController';

const router = Router();

// List wines
router.get('/', adminWineController.listWines);
// Create wine
router.post('/', adminWineController.createWine);
// Update wine
router.put('/:id', adminWineController.updateWine);
// Delete wine
router.delete('/:id', adminWineController.deleteWine);

export default router;
