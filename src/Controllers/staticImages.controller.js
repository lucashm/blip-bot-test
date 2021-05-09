import express from 'express';
import path from 'path';
import fs from 'fs';
import { errorBuilder } from '../Middlewares/errorHandler';

const router = express.Router();

router.get('/take', async (req, res, next) => {
  try {
    const { name } = req.query;
    const filePath = path.resolve(`${__dirname}/../Images/${name}-image.png`);
    if (!fs.existsSync(filePath)) throw errorBuilder("File doesn't exists", 404);
    res.sendFile(filePath);
  } catch (err) {
    next(err);
  }
});

export default router;
