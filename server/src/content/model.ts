import * as path from 'path';
import * as fs from 'fs-extra';
import { encrypt, hashPass, sha1 } from 'crypto-buddy';
import config from '../common/config';
import { readJson, outputJson } from '../common/io';

const CONTENT_DIR = path.join(config.DK_DATA_DIR, 'content');
fs.mkdirpSync(CONTENT_DIR);

export interface Content {
}

export async function createOrUpdate(location: string, content: Content) {
    await save(location, content);
}

export async function remove(location: string) {
    await fs.remove(path.join(CONTENT_DIR, location));
}

export async function getByLocation(location: string): Promise<Content> {
    const file = path.join(CONTENT_DIR, location, 'index.json');
    const content: Content = await readJson(file);
    return content;
}

async function save(location: string, content: Content) {
    const dir = path.join(CONTENT_DIR, location);
    await fs.mkdirp(dir);

    const file = path.join(dir, 'index.json');
    await outputJson(file, content);
}
