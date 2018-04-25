import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../common/config';
import { encrypt, sha1 } from 'crypto-buddy';
import * as usersModel from '../users/model';

const router = Router();

router.post('/login', (req, res) => {
    const { email } = req.body;
    const decoded = {
        id: encrypt(config.DK_ENCRYPTION_KEY, sha1(email)),
    };
    const token = jwt.sign(decoded, config.DK_JWT_SECRET, { expiresIn: '1h' });

    res.send(token);
});

export default router;
