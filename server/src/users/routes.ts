import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../common/config';
import { encrypt, sha1 } from 'crypto-buddy';
import { Session } from './model';
import { authenticate } from './middleware';
import * as model from '../users/model';

const router = Router();

router.post('/login', (req, res) => {
    const { email } = req.body;
    const session: Session = {
        id: encrypt(config.DK_ENCRYPTION_KEY, sha1(email)),
    };
    const sessionToken = jwt.sign(session, config.DK_JWT_SECRET, { expiresIn: '1h' });

    res.send(sessionToken);
});

router.post('/set-email', authenticate, async (req, res) => {
    const user = req.user;
    const { newEmail } = req.body;
    await model.setEmail(user.email, newEmail);
    res.sendStatus(200);
});

router.post('/set-password', authenticate, async (req, res) => {
    const user = req.user;
    const { newPassword } = req.body;
    await model.setPassword(user.email, newPassword);
    res.sendStatus(200);
});

export default router;
