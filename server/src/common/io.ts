import * as path from 'path';
import * as fs from 'fs-extra';
import { encrypt, decrypt } from 'crypto-buddy';
import config from './config';

export async function readJson(file: string) {
    if (config.DK_ENCRYPT_DATA) {
        const data = await fs.readFile(file);
        console.log('data', data);
        return JSON.parse(decrypt(config.DK_ENCRYPTION_KEY, data.toString()));
    } else {
        return fs.readJson(file);
    }
}

export async function outputJson(file: string, json: object) {
    const dir = path.dirname(file);
    await fs.mkdirp(dir);
    if (config.DK_ENCRYPT_DATA) {
        const data = encrypt(config.DK_ENCRYPTION_KEY, JSON.stringify(json));
        await fs.outputFile(file, data);
    } else {
        await fs.outputJson(file, json);
    }
}
