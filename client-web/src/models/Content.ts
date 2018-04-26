// import axios from 'axios';

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
    async onLoad(payload: {}, rootState: { content: State }) {
        console.log('onLoad', rootState);
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

