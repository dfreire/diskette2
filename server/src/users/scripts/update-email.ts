import * as path from 'path';
import * as fs from 'fs-extra';
import * as prompts from 'prompts';
import * as usersModel from '../model';

async function run() {
    const { oldEmail, newEmail } = await prompts([{
        type: 'text',
        name: 'oldEmail',
        message: 'old email'
    }, {
        type: 'text',
        name: 'newEmail',
        message: 'new email'
    }]);

    await usersModel.updateEmail(oldEmail, newEmail);
}

run();
