import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Profile from '~/pages/Profile';

import Products from '~/pages/Products';
import UpdateProduct from '~/pages/Products/UpdateProduct';
import RegisterProduct from '~/pages/Products/RegisterProduct';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signUp" component={SignUp} />

            <Route path="/profile" component={Profile} isPrivate />

            <Route exact path="/products" component={Products} isPrivate />
            <Route
                path="/products/update/:id"
                component={UpdateProduct}
                isPrivate
            />
            <Route
                path="/products/register"
                component={RegisterProduct}
                isPrivate
            />
        </Switch>
    );
}
