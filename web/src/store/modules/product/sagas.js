import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
    registerProductSuccess,
    registerProductFailure,
    updateProductFailure,
    deleteProductFailure,
    deleteProductSuccess,
} from './actions';

function* registerProduct({ payload }) {
    try {
        const {
            product,
            description,
            price,
            amount,
            user_id,
        } = payload.product;

        yield call(api.post, '/products', {
            product,
            description,
            price,
            amount,
            user_id,
        });

        toast.success('Produto criado com sucesso');

        yield put(registerProductSuccess(payload.product));

        history.push('/products');
    } catch (err) {
        toast.error('Erro ao criar produto');

        yield put(registerProductFailure());
    }
}

function* updateProduct({ payload }) {
    try {
        const { id } = payload;
        const {
            product,
            description,
            price,
            amount,
            user_id,
        } = payload.product;

        yield call(api.put, `/products/${id}`, {
            product,
            description,
            price,
            amount,
            user_id,
        });

        toast.success('Produto atualizado com sucesso');

        history.push('/products');
    } catch (err) {
        toast.error('Falha ao atualizar produto');

        yield put(updateProductFailure());
    }
}

function* deleteProduct({ payload }) {
    try {
        const { id, user_id } = payload;

        yield call(api.delete, `/products/${id}/${user_id}`);

        toast.success('Produto deletado com sucesso');

        yield put(deleteProductSuccess(id));

        history.push('/products');
    } catch (err) {
        toast.error('Falha ao remover produto');

        yield put(deleteProductFailure());
    }
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
    takeLatest('@product/REGISTER_PRODUCT_REQUEST', registerProduct),
    takeLatest('@product/UPDATE_PRODUCT_SUCCESS', updateProduct),
    takeLatest('@product/DELETE_PRODUCT_REQUEST', deleteProduct),
]);
