import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signInFailure } from './actions';

function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, '/sessions', {
            email,
            password,
        });

        const { user, token } = response.data;

        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(user, token));

        history.push('/products');
    } catch (err) {
        toast.error('E-mail ou senha incorretos!');

        yield put(signInFailure());
    }
}

function signOut() {
    history.push('/');
}

function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
