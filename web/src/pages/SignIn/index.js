import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    email: Yup.string().email().required('O campo e-mail é obrigatório'),
    password: Yup.string()
        .min(8, 'Campo com menos de 8 caracteres')
        .required('O campo senha é obrigatório'),
});

export default function SignIn() {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.auth.loading);

    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }

    return (
        <div>
            <Link to="/products">
                <img src={logo} alt="Lukstore" />
            </Link>

            <Form schema={schema} onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <Input type="email" name="email" placeholder="Seu e-mail" />

                <label htmlFor="password">Senha</label>
                <Input
                    type="password"
                    name="password"
                    placeholder="Sua senha"
                />

                <button type="submit">
                    {loading ? 'Carregando...' : 'Acessar'}
                </button>

                <Link to="/signUp">Criar conta</Link>
            </Form>
        </div>
    );
}
