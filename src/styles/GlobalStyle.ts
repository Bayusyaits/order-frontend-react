import { createGlobalStyle } from 'styled-components'
import { colors } from 'styles'

const GlobalStyle = createGlobalStyle`
  html {
    color: ${colors.grey900};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }

  body {
    margin: 0;
    font-family: "Roboto";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  ::before,
  ::after {
    border-width: 0;
    border-style: solid;
  }

  a {
    text-decoration: none;
  }

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }

  ol,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`

export default GlobalStyle
