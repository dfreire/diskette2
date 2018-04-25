import * as path from 'path';

interface Config {
    DK_ENCRYPTION_KEY: string;
    DK_ENCRYPT_DATA: boolean;
    DK_JWT_SECRET: string;
    DK_DATA_DIR: string;
    DK_PORT: number;
}

function _parseBoolean(value: any) {
    const _value = (value as any || 'false').toLowerCase();
    return _value === 'true' || _value === '1';
}

function _parseInt(value: any) {
    return parseInt(value);
}

const config: Config = require('dotenv').config().parsed;
config.DK_ENCRYPT_DATA = _parseBoolean(config.DK_ENCRYPT_DATA);
config.DK_DATA_DIR = path.join(process.cwd(), config.DK_DATA_DIR);
config.DK_PORT = _parseInt(config.DK_PORT);

export default config;
