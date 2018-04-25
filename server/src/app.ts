import * as http from 'http';
import * as express from 'express';
import config from './common/config';
import usersRouter from './users/routes';
import contentRouter from './content/routes';
import typesRouter from './types/routes';
import uploadRouter from './upload/routes';

const app = express();
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/content', contentRouter);
app.use('/api/types', typesRouter);
app.use('/api/upload', uploadRouter);

const server = http.createServer(app);
server.listen(config.DK_PORT);
server.on('error', error => console.error(error));
server.on('listening', () => console.log('Listening on port', config.DK_PORT));
