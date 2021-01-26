import { combineReducers } from 'redux';

import auth from './auth/reducers';
import user from './user/reducers';
import product from './product/reducers';

export default combineReducers({ auth, user, product });
