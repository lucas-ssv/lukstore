import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
    max-width: 1200px;
    padding: 30px;
    margin: 0 auto;

    h1 {
        font-size: 32px;
        color: #ffa553;
    }

    div {
        background: #fff;
        border-radius: 4px;
        padding: 15px;
        margin: 30px 0;

        form {
            display: flex;
            flex-direction: column;

            label {
                font-size: 16px;
                font-weight: bold;
            }

            input,
            textarea {
                font: 14px 'Roboto', sans-serif;
                border: 1px solid #ccc;
                padding: 10px;
                border-radius: 4px;
                margin: 10px 0;
            }

            textarea {
                max-width: 100%;
                min-width: 100%;
                min-height: 80px;
            }

            hr {
                border: 1px solid #eee;
                margin: 15px 0;
            }

            button {
                display: flex;
                justify-content: center;
                font-size: 16px;
                color: #fff;
                font-weight: bold;
                background: #ffa553;
                border-radius: 4px;
                border: 0;
                padding: 15px;
                transition: background 0.2s;

                &:hover {
                    background: ${lighten(0.03, '#ffa553')};
                }
            }
        }
    }
`;
