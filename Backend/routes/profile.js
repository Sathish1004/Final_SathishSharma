import express from 'express';
import { getSettings, updateSettings } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/settings', protect, getSettings);
router.put('/settings', protect, updateSettings);

export default router;
