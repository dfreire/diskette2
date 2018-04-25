import { Router } from 'express';
import { authenticate } from '../auth/middleware';
import * as model from './model';

const router = Router();

export default router;
