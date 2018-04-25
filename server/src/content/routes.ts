import { Router } from 'express';
import { authenticate } from '../auth/middleware';
import * as model from './model';

const router = Router();

router.get('/*', authenticate, async (req, res) => {
    try {
        const location = req.params[0];
        const content = await model.getByLocation(location);
        res.sendStatus(200).json(content);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/*', authenticate, async (req, res) => {
    try {
        const location = req.params[0];
        const { content } = req.body;
        await model.createOrUpdate(location, content);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.delete('/', authenticate, async (req, res) => {
    try {
        const location = req.params[0];
        await model.remove(location);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default router;
