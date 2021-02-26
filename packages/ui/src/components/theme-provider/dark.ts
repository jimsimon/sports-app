import { css } from 'lit-element';

export default css`
  html {
    --theme-color-neutral-1000: #121212;
    --theme-color-neutral-900: #102a43;
    --theme-color-neutral-800: #243b53;
    --theme-color-neutral-700: #334e68;
    --theme-color-neutral-600: #486581;
    --theme-color-neutral-500: #627d98;
    --theme-color-neutral-400: #829ab1;
    --theme-color-neutral-300: #9fb3c8;
    --theme-color-neutral-200: #bcccdc;
    --theme-color-neutral-100: #d9e2ec;
    --theme-color-neutral-50: #f0f4f8;
    --theme-color-primary: #303f9f;
    --theme-color-secondary: #bdbdbd;
    --theme-color-confirm: #00897b;
    --theme-color-warning: #ffa000;
    --theme-color-danger: #c62828;
    --theme-color-help: #673ab7;

    background: var(--theme-color-neutral-1000);
    color: var(--theme-color-neutral-50);
    font-family: 'Lato', sans-serif;
    font-size: 16px;
  }
`;
