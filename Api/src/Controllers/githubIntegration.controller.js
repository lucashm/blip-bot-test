import express from 'express';
import axios from 'axios';
import { getOldestCsharpRepos, getOrgImageURL } from '../Services/githubIntegration.service';
import { errorBuilder } from '../Middlewares/errorHandler';

const router = express.Router();

router.get('/oldest-csharp-repos', async (req, res, next) => {
  try {
    const { orgName, position } = req.query;
    if (!position) throw errorBuilder('You should send a position as a query parameter', 400);
    if (!orgName) throw errorBuilder('You should send an github organization name as a query parameter', 400);
    const data = await getOldestCsharpRepos(orgName, position);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get('/repo-image-url', async (req, res, next) => {
  try {
    const { orgName } = req.query;
    const url = await getOrgImageURL(orgName);
    const { data } = await axios.get(url, { responseType: 'arraybuffer' });
    const img = Buffer.from(data, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length,
    });
    res.end(img);
  } catch (err) {
    next(err);
  }
});

export default router;
