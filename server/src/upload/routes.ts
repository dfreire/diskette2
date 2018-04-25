import * as path from 'path';
import * as fs from 'fs-extra';
import { Router } from 'express';
import * as multer from 'multer';
import * as slug from 'slugg';
import { authenticate } from '../auth/middleware';
import config from '../common/config';

fs.mkdirpSync(config.DK_UPLOAD_DIR);
const upload = multer({ dest: config.DK_UPLOAD_DIR });

const router = Router();

router.post('/*', authenticate, upload.array('files'), async (req, res) => {
	const pathname = req.params[0];

	for (let file of req.files as Express.Multer.File[]) {
		const tokens = file.originalname.split('.');
		const name = slug(tokens[0]);
        const ext = slug(tokens[1]);
        await fs.move(file.path, path.join(config.DK_CONTENT_DIR, pathname, `${name}.${ext}`))
	}

	res.send();
});

export default router;
