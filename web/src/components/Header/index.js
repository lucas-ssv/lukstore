import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlinePoweroff } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';

import logo from '~/assets/logo.svg';

import { Container } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
    const user = useSelector((state) => state.user.profile);

    const dispatch = useDispatch();

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>
            <img src={logo} alt="Lukstore" />

            <div>
                <ul>
                    <li>
                        <Link to="/products">Produtos</Link>
                    </li>
                    <li>
                        <Link to="/products/register">
                            <MdAdd color="#000" size={18} />
                            Adicionar produto
                        </Link>
                    </li>
                </ul>

                <Link to="/profile">
                    <strong>{user.name}</strong>
                </Link>

                <button type="button" onClick={handleSignOut}>
                    <AiOutlinePoweroff color="#ff0000" size={18} />
                </button>
            </div>
        </Container>
    );
}
