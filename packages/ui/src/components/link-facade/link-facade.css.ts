import { css } from 'lit-element';

export default css`
  ::slotted(a) {
    color: var(--theme-color-neutral-50);
    text-decoration: none;
    outline: 0;
    border: 1px solid transparent;
    padding: 0.25rem;
  }

  ::slotted(a:hover),
  ::slotted(a:focus) {
    text-decoration: underline;
  }

  ::slotted(a:focus) {
    color: var(--theme-color-help);
  }
`;
