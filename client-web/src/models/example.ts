export interface Actions {
    increment: { (): void };
    increment2: { (): void };
    incrementAsync: { (): void };
};

export interface Props {
    x: number;
}

type State = Props;

const INITIAL_STATE: State = {
    x: 0,
};

const reducers = {
    increment(state: State): State {
        console.log('increment state', state);
        return { ...state, x: state.x + 1 };
    },
    increment2(state: State, payload: {}): State {
        const _state = reducers.increment(state);
        return { ..._state, x: _state.x + 1 };
    },
};

const effects = {
    async incrementAsync(payload: {}, rootState: { example: State }) {
        console.log('incrementAsync rootState', rootState);
        console.log('incrementAsync this', this);
        await new Promise(resolve => setTimeout(resolve, 1000));
        actions(this).increment();
    },
};

function actions(that: any) {
    return (that as any) as Actions;
}

export const example = {
    state: { ...INITIAL_STATE },
    reducers,
    effects
};
