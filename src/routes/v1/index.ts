import express from 'express';
import authRoutes from '@/routes/v1/auth';
const router = express.Router();

router.use('/auth', authRoutes);

// Root Route
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is up!',
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

export default router;
