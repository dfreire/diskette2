import * as path from 'path';
import * as fs from 'fs-extra';
import { encrypt, hashPass, sha1 } from 'crypto-buddy';
import config from '../common/config';
import { readJson, outputJson } from '../common/io';

const USERS_DIR = path.join(config.DK_DATA_DIR, 'users');
fs.mkdirpSync(USERS_DIR);

export interface User {
    email: string;
    passHash: string;
}

export async function create(email: string, password: string) {
    const user: User = {
        email,
        passHash: hashPass(password),
    };

    await save(user);
}

export async function updateEmail(oldEmail: string, newEmail: string) {
    const user: User = await getByEmail(oldEmail);
    user.email = newEmail;
    await save(user);

    const oldFile = path.join(USERS_DIR, `${sha1(oldEmail)}.json`);
    await fs.remove(oldFile);
}

export async function updatePassword(email: string, newPassword: string) {
    const user: User = await getByEmail(email);
    user.passHash = hashPass(newPassword);
    await save(user);
}

export async function getByEmail(email: string): Promise<User> {
    return getByEmailSha1(sha1(email));
}

export async function getByEmailSha1(emailSha1: String): Promise<User> {
    const file = path.join(USERS_DIR, `${emailSha1}.json`);
    const user: User = await readJson(file);
    return user;
}

async function save(user: User) {
    const file = path.join(USERS_DIR, `${sha1(user.email)}.json`);
    await outputJson(file, user);
}