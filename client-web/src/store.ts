import { init } from '@rematch/core';
import { example } from './models/example';
import { another } from './models/another';

export default init({
    models: {
        example,
        another,
    }
});
