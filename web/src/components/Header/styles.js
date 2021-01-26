import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: 0 30px;

    img {
        width: 120px;
    }

    div {
        display: flex;
        align-items: center;

        ul {
            display: flex;
            align-items: center;
            margin: 0 25px;
            padding: 0 25px;
            border-right: 1px solid #282828;

            li {
                margin-right: 15px;

                & + li {
                    margin-right: 0;
                    background: #ffa553;
                    font-weight: bold;
                    border-radius: 4px;
                    transition: background 0.2s;

                    &:hover {
                        background: ${lighten(0.03, '#ffa553')};
                    }
                }

                @media (max-width: 660px) {
                    & + li {
                        display: none;
                    }
                }

                a {
                    display: flex;
                    align-items: center;
                    padding: 8px;
                }
            }
        }

        strong {
            margin-right: 10px;
        }

        button {
            background: 0;
            border: 0;
        }
    }
`;
