import * as path from 'path';
import * as fs from 'fs-extra';
import * as prompts from 'prompts';
import * as usersModel from '../model';

async function run() {
    const { email, password } = await prompts([{
        type: 'text',
        name: 'email',
        message: 'current email'
    }, {
        type: 'password',
        name: 'password',
        message: 'new password'
    }]);

    await usersModel.updatePassword(email, password);
}

run();
