import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    *:hover {
        outline: 0;
    }

    html, body, #root {
        font: 14px 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: #333;
    }

    button {
        cursor: pointer;
    }
`;
