import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is up!',
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});


export default routes;