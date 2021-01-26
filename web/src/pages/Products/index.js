import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { MdEdit, MdDeleteForever, MdAdd } from 'react-icons/md';

import { Container, ProductsList } from './styles';

import api from '~/services/api';

import { deleteProductRequest } from '~/store/modules/product/actions';

import { formatPrice } from '~/utils/formatPrice';

export default function Dashboard() {
    const user_id = useSelector((state) => state.user.profile.id);

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const items = products.length;

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/product', {
                params: { q: search, id: user_id },
            });

            const data = response.data.map((product) => ({
                ...product,
                priceFormatted: formatPrice(product.price),
            }));

            setProducts(data);
        }

        loadProducts();
    }, [user_id, search]);

    function handleDeleteProduct(id) {
        const confirmDelete = window.confirm(
            'Deseja realmente remover este produto?'
        );

        if (confirmDelete) {
            dispatch(deleteProductRequest(id, user_id));
        }
    }

    return (
        <Container>
            <div>
                <h1>Produtos</h1>

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar produto"
                />
            </div>

            {!items ? (
                <h1>Sem estoque de produtos</h1>
            ) : (
                <ProductsList>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.product}</td>
                                <td>{product.description}</td>
                                <td>{product.priceFormatted}</td>
                                <td>{product.amount}</td>
                                <td>
                                    <Link to={`/products/update/${product.id}`}>
                                        <MdEdit color="#ffa553" size={22} />
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteProduct(product.id)
                                        }
                                    >
                                        <MdDeleteForever
                                            color="#ff0000"
                                            size={22}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </ProductsList>
            )}

            <Link to="/products/register">
                <MdAdd color="#666" size={35} />
                Adicionar produto
            </Link>
        </Container>
    );
}
