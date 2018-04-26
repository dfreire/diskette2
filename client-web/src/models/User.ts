import axios from 'axios';

export interface State {
    sessionToken: string;

    loginPage: {
        email: string;
        password: string;
        errorMessage: string;
    };
}

export interface Dispatch {
    onLoginPageChangeField: { (payload: { key: 'email' | 'password', value: string }): void };

    login: { (): void };
    onLoginError: { (): void };

    logout: { (): void };
};

const INITIAL_STATE: State = {
    sessionToken: localStorage.getItem('sessionToken') || '',

    loginPage: {
        email: '',
        password: '',
        errorMessage: '',
    },
};

const reducers = {
    onLoginPageChangeField(state: State, payload: { key: 'email' | 'password', value: string }): State {
        const { key, value } = payload;
        const loginPage = { ...state.loginPage };
        loginPage[key] = value;
        return { ...state, loginPage };
    },

    onLoginError(state: State): State {
        const loginPage = { ...state.loginPage };
        loginPage.errorMessage = 'Access Denied';
        return { ...state, loginPage };
    },
};

const effects = {
    async login(payload: {}, rootState: { user: State }) {
        const { email, password } = rootState.user.loginPage;
        const res = await axios.post('/api/users/login', { email, password });
        if (res.status === 200) {
            const sessionToken = res.data;
            localStorage.setItem('sessionToken', sessionToken);
            window.location.href = '/home';
        } else {
            dispath(this).onLoginError();
        }
    },

    logout(payload: {}, rootState: { user: State }) {
        localStorage.removeItem('sessionToken');
        window.location.href = '/login';
    },
};

function dispath(that: any) {
    return (that as any) as Dispatch;
}

export const user = {
    state: { ...INITIAL_STATE },
    reducers,
    effects
};
