import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
    res.send('respond with a resource');
});

export default router;
