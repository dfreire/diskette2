import * as http from 'http';
import * as express from 'express';
import { Bearer } from 'permit';
import config from './common/config';
import { authenticate } from './auth/middleware';
import authRouter from './auth/routes';
import usersRouter from './users/routes';
import contentRouter from './content/routes';
import typesRouter from './types/routes';

const app = express();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/content', contentRouter);
app.use('/types', typesRouter);

const server = http.createServer(app);
server.listen(config.DK_PORT);
server.on('error', error => console.error(error));
server.on('listening', () => console.log('Listening on port', config.DK_PORT));
