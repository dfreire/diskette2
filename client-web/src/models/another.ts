export interface Actions {
    decrement: { (): void };
    decrement2: { (): void };
    decrementAsync: { (): void };
};

export interface Props {
    y: number;
}

type State = Props;

const INITIAL_STATE: State = {
    y: 100,
};

const reducers = {
    decrement(state: State): State {
        console.log('decrement state', state);
        return { ...state, y: state.y - 1 };
    },
    decrement2(state: State, payload: {}): State {
        const _state = reducers.decrement(state);
        return { ..._state, y: _state.y - 1 };
    },
};

const effects = {
    async decrementAsync(payload: {}, rootState: { example: State }) {
        console.log('decrementAsync rootState', rootState);
        console.log('decrementAsync this', this);
        await new Promise(resolve => setTimeout(resolve, 1000));
        actions(this).decrement();
    },
};

function actions(that: any) {
    return (that as any) as Actions;
}

export const another = {
    state: { ...INITIAL_STATE },
    reducers,
    effects
};
