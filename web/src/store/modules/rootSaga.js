import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import product from './product/sagas';

export default function* rootSaga() {
    yield all([auth, user, product]);
}
