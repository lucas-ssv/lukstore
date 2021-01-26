import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { Form, Input, Textarea } from '@rocketseat/unform';

import { Container } from './styles';

import { updateProductSuccess } from '~/store/modules/product/actions';

const schema = Yup.object().shape({
    product: Yup.string().required('Produto é obrigatório'),
    description: Yup.string(),
    price: Yup.number()
        .required('Valor é obrigatório')
        .typeError('Valor é obrigatório'),
    amount: Yup.number()
        .required('Estoque é obrigatório')
        .typeError('Estoque é obrigatório'),
});

export default function UpdateProduct({ match }) {
    const { id } = match.params;

    const user_id = useSelector((state) => state.user.profile.id);

    const dispatch = useDispatch();

    function handleSubmit(product) {
        product = {
            ...product,
            user_id,
        };

        dispatch(updateProductSuccess(product, id));
    }

    return (
        <Container>
            <h1>Alterando produto</h1>

            <div>
                <Form schema={schema} onSubmit={handleSubmit}>
                    <label htmlFor="product">Produto</label>
                    <Input name="product" placeholder="Nome do produto" />

                    <label htmlFor="description">Descrição</label>
                    <Textarea
                        rows="5"
                        name="description"
                        placeholder="Descrição do produto"
                    />

                    <label htmlFor="price">Valor</label>
                    <Input name="price" placeholder="Valor do produto" />

                    <label htmlFor="amount">Estoque</label>
                    <Input
                        type="number"
                        name="amount"
                        placeholder="Estoque do produto"
                    />

                    <button type="submit">Alterar produto</button>
                </Form>
            </div>
        </Container>
    );
}

UpdateProduct.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }).isRequired,
};
