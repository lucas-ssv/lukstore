import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
    signUpFailure,
    updateProfileFailure,
    updateProfileSuccess,
} from './actions';

function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        yield call(api.post, '/users', {
            name,
            email,
            password,
        });

        toast.success('Usuário criado com sucesso');

        history.push('/');
    } catch (err) {
        toast.error('Esse e-mail já está cadastrado');

        yield put(signUpFailure());
    }
}

function* updateProfile({ payload }) {
    try {
        const {
            name,
            email,
            oldPassword,
            password,
            confirmPassword,
        } = payload.profile;

        const response = yield call(api.put, '/users', {
            name,
            email,
            oldPassword,
            password,
            confirmPassword,
        });

        toast.success('Usuário atualizado com sucesso');

        yield put(updateProfileSuccess(response.data));

        history.push('/products');
    } catch (err) {
        toast.error('Falha ao atualizar usuário');

        yield put(updateProfileFailure());
    }
}

export default all([
    takeLatest('@user/SIGN_UP_SUCCESS', signUp),
    takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);
