import { css } from 'lit-element';

export default css`
  ::slotted(input) {
    color: var(--theme-color-neutral-50);
    background: transparent;
    margin-left: 0.25rem;
    border-radius: 4px;
    border: 1px solid var(--theme-color-secondary);
    font-size: 1rem;
    padding: 0.75rem 1rem;
    outline: 0;
  }

  ::slotted(input::placeholder) {
    color: var(--theme-color-neutral-400);
  }

  ::slotted(input:focus) {
    border-color: var(--theme-color-help);
  }
`;
