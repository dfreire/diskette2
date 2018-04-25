import { Bearer } from 'permit';
import * as jwt from 'jsonwebtoken';
import config from '../common/config';
import { decrypt } from 'crypto-buddy';
import * as usersModel from '../users/model';

const permit = new Bearer();

export async function authenticate(req, res, next) {
	try {
		const token = permit.check(req); // header "Authorization: Bearer token"
		const decoded = jwt.verify(token, config.DK_JWT_SECRET) as { id: string };
		const emailSha1 = decrypt(config.DK_ENCRYPTION_KEY, decoded.id);
		req.user = await usersModel.getByEmailSha1(emailSha1);
		next();
	} catch (err) {
		permit.fail(res);
		res.sendStatus(401);
	}
}
