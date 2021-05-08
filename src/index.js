import express from 'express';
import githubIntegrationController from './Controllers/githubIntegration.controller';
import { errorHandler } from './Middlewares/errorHandler';

const app = express();

app.use('/github-integration', githubIntegrationController);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`API listening at port ${process.env.PORT}`);
});
