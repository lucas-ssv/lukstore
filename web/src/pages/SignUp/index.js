import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

import { signUpSuccess } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string().required('O e-mail é obrigatório'),
    password: Yup.string()
        .min(8, 'Campo com menos de 8 caracteres')
        .required('A senha é obrigatória'),
});

export default function SignUp() {
    const dispatch = useDispatch();

    function handleSubmit({ name, email, password }) {
        dispatch(signUpSuccess(name, email, password));
    }

    return (
        <div>
            <img src={logo} alt="Lukstore" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <label htmlFor="name">Nome</label>
                <Input name="name" placeholder="Seu nome" />

                <label htmlFor="email">E-mail</label>
                <Input type="email" name="email" placeholder="Seu e-mail" />

                <label htmlFor="password">Senha</label>
                <Input
                    type="password"
                    name="password"
                    placeholder="Sua senha"
                />

                <button type="submit">Criar conta</button>

                <Link to="/">Fazer login</Link>
            </Form>
        </div>
    );
}
