import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif; // Altere para a fonte do Figma se for diferente (ex: Roboto)
    list-style: none;
    text-decoration: none;
}

body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.primary};
}

.container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    padding: 0 16px;
}
`