import * as http from 'http';
import * as express from 'express';
import { Bearer } from 'permit';
import config from './common/config';
import authRouter from './auth/routes';
import usersRouter from './users/routes';
import { authenticate } from './auth/middleware';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.get('/restricted', authenticate, (req, res) => {
    console.log('req.user', req.user);
    res.send('Restricted content!')
});

const server = http.createServer(app);
server.listen(config.DK_PORT);
server.on('error', error => console.error(error));
server.on('listening', () => console.log('Listening on port', config.DK_PORT));
