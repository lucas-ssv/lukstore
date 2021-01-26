import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;

    > h1 {
        color: #eee;
        text-align: center;
        margin: 15px 0;
    }

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-size: 32px;
            color: #ffa553;
        }

        input {
            font-size: 14px;
            border: 0;
            border-radius: 4px;
            padding: 8px 15px;
        }
    }

    > a {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 0 0 4px 4px;
        color: #666;
        font-size: 24px;
        font-weight: bold;
        border: 0;
        padding: 10px;
        transition: background 0.2s;

        svg {
            margin-right: 10px;
        }

        &:hover {
            background: ${lighten(0.03, '#333')};
        }
    }
`;

export const ProductsList = styled.table`
    width: 100%;
    background: #fff;
    border-radius: 4px 4px 0 0;
    padding: 15px;
    margin: 30px 0 0;

    th {
        font-size: 16px;
        text-align: left;
    }

    td {
        font-size: 16px;
        color: #666;
        padding: 5px 0;

        a {
            margin-right: 5px;
        }

        button {
            background: none;
            border: 0;
        }
    }
`;
