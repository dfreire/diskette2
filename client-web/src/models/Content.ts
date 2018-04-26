import axios from 'axios';
import * as UserModel from './User';
import { logoutIf401 } from './util';

export interface State {
}

export interface Dispatch {
    onLoad: { (): void };
};

const INITIAL_STATE: State = {
};

const reducers = {
};

const effects = {
    async onLoad(payload: {}, rootState: { content: State, user: UserModel.State }) {
        console.log('onLoad', rootState);
        try {
            const res1 = await axios.get('/api/content', {
                headers: { Authorization: `Bearer ${rootState.user.sessionToken}` },
            });

            console.log('res1.data', res1.data);
            const content = res1.data;

            const res2 = await axios.get(`/api/types/${content.type}`, {
                headers: { Authorization: `Bearer ${rootState.user.sessionToken}` },
            });

            console.log('res2.data', res2.data);

        } catch (err) {
            console.error(err);
            logoutIf401(err);
        }
    },
};

// function dispath(that: any) {
//     return (that as any) as Dispatch;
// }

export const content = {
    state: { ...INITIAL_STATE },
    reducers,
    effects
};

