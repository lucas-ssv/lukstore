import React from 'react';
import { useDispatch } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';

import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
    const dispatch = useDispatch();

    function handleSubmit(profile) {
        dispatch(updateProfileRequest(profile));
    }

    return (
        <Container>
            <h1>Alterando dados</h1>

            <div>
                <Form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nome</label>
                    <Input name="name" placeholder="Seu nome" />

                    <label htmlFor="email">E-mail</label>
                    <Input type="email" name="email" placeholder="Seu e-mail" />

                    <hr />

                    <label htmlFor="oldPassword">Senha atual</label>
                    <Input
                        type="password"
                        name="oldPassword"
                        placeholder="Sua senha"
                    />

                    <label htmlFor="password">Nova senha</label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Nova senha"
                    />

                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmação de senha"
                    />

                    <button type="submit">Salvar dados</button>
                </Form>
            </div>
        </Container>
    );
}
