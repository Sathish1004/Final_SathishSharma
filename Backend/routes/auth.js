import { Router } from 'express';
import { login, getMe, verifyAdminOtp } from '../controllers/authController.js';
import { sendOtp, registerWithOtp } from '../controllers/OtpController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/send-otp', sendOtp);
router.post('/register', registerWithOtp);
router.post('/login', login);
router.post('/verify-admin-otp', verifyAdminOtp);
router.get('/me', protect, getMe);

export default router;
