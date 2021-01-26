import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #282828;
    padding: 30px;

    div {
        width: 350px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #fff;
        border-radius: 4px;
        padding: 30px;

        img {
            width: 200px;
            margin: 0 0 15px;
        }

        form {
            width: 100%;
            display: flex;
            flex-direction: column;

            label {
                font-size: 14px;
                color: #333;
                font-weight: bold;
                margin: 8px 0;
            }

            input {
                width: 100%;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 14px;
                padding: 8px;
            }

            span {
                margin-top: 5px;
                color: #ff0000;
            }

            button {
                background: #ffa553;
                font-size: 16px;
                color: #fff;
                font-weight: bold;
                border: 0;
                padding: 10px;
                border-radius: 4px;
                margin: 15px 0;
                transition: background 0.2s;

                &:hover {
                    background: ${lighten(0.03, '#ffa553')};
                }
            }

            a {
                text-align: center;
                font-weight: bold;
                color: #444;
            }
        }
    }
`;
