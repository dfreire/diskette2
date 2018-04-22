export interface State {
    sessionToken: string;

    loginPage: {
        email: string;
        password: string;
        errorMessage: string;
    };
}

export interface Dispatch {
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
    onLoginError(state: State): State {
        const loginPage = { ...state.loginPage };
        loginPage.errorMessage = 'Access Denied';
        return { ...state, loginPage };
    },
};

const effects = {
    async login(payload: {}, rootState: { user: State }) {
        console.log('login');
        // const { email, password } = rootState.user.loginPage;
        // if (email === 'admin' && password === 'admin') {
        const sessionToken = 'admin-session';
        localStorage.setItem('sessionToken', sessionToken);
        window.location.href = '/home';
        // } else {
        //     dispath(this).onLoginError();
        // }
    },

    logout(payload: {}, rootState: { user: State }) {
        localStorage.removeItem('sessionToken');
        window.location.href = '/login';
    },
};

// function dispath(that: any) {
//     return (that as any) as Dispatch;
// }

export const user = {
    state: { ...INITIAL_STATE },
    reducers,
    effects
};
