import * as styled from 'styled-components'

import { StyleClosetTheme } from './Theme'
import fontsCss from './fonts.module.css'

export const GlobalStyles = styled.createGlobalStyle<{
  theme: StyleClosetTheme
}>`
  :root {
  }

  @media (prefers-color-scheme: dark) {
    :root {
    }
  }
  // this works as a normal styled css
  ${fontsCss}

  /* Box sizing rules */
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    min-height: 100vh;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    text-rendering: optimizeSpeed;
    /* font-family: ${({ theme }) => theme.fonts.ranga}, sans-serif; */
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    /* background-color: ${({ theme }) => theme.colors.background}; */
    line-height: 1;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  figure,
  blockquote,
  dl,
  dd {
    padding: 0;
    margin: 0;
  }

  button {
    border: none;
    background-color: transparent;
    font-family: inherit;
    padding: 0;
    cursor: pointer;
  }

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role='list'],
  ol[role='list'] {
    list-style: none;
  }
  li {
    list-style-type: none;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* A elements that don't have a class get default styles */
  a {
    color: inherit;
    text-decoration: none;
  }
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html {
      color-scheme: dark;
    }
    html:focus-within {
      scroll-behavior: auto;
    }
  }
`
