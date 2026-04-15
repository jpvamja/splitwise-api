import express from 'express';

import { router } from './routes/index.routes';

import { errorHandler } from './middleware/errorHandler';
import { loggerHandler } from './middleware/loggerMiddleware';
import helmetMiddleware from './middleware/helmetMiddleware';
import corsMiddleware from './middleware/corsMiddleware';
import rateLimitMiddleware from './middleware/rateLimitHandler';

const app = express();

app.use(express.json());
app.use(loggerHandler);
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(rateLimitMiddleware);

app.use('/api/v1', router);

app.use(errorHandler);

export default app;
