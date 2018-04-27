import axios from 'axios';
import * as UserModel from './User';
import { logoutIf401 } from './util';

export interface State {
    contentPage: {
        content: Content;
        contentType: ContentType;
        errorMessage: string;
    };
}

interface Content {
    type: string;
    fields: object;
    subDirs: string[];
}

interface ContentType {

}

export interface Dispatch {
    onLoad: { (payload: { pathname: string }): void };
    onLoaded: { (payload: { content: Content, contentType: ContentType }): void };
};

const INITIAL_STATE: State = {
    contentPage: {
        content: {
            type: '',
            fields: {},
            subDirs: [],
        },
        contentType: {
        },
        errorMessage: '',
    }
};

const reducers = {
    onLoaded(state: State, payload: { content: Content, contentType: ContentType }) {
        const { content, contentType } = payload;
        const contentPage = { ...INITIAL_STATE.contentPage, content, contentType };
        return { ...state, contentPage };
    },
};

const effects = {
    async onLoad(payload: { pathname: string }, rootState: { content: State, user: UserModel.State }) {
        const { pathname } = payload;
        console.log('onLoad pathname', pathname);
        try {
            const res1 = await axios.get(`/api${pathname}`, {
                headers: { Authorization: `Bearer ${rootState.user.sessionToken}` },
            });

            const content = res1.data;

            const res2 = await axios.get(`/api/types/${content.type}`, {
                headers: { Authorization: `Bearer ${rootState.user.sessionToken}` },
            });

            const contentType = res2.data;

            dispath(this).onLoaded({ content, contentType });
        } catch (err) {
            console.error(err);
            logoutIf401(err);
        }
    },
};

function dispath(that: any) {
    return (that as any) as Dispatch;
}

export const content = {
    state: { ...INITIAL_STATE },
    reducers,
    effects
};
