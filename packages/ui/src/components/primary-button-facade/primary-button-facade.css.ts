import { css } from 'lit-element';

export default css`
  ::slotted(button) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1rem;
    border: none;
    font: inherit;
    color: inherit;
    /* show a hand cursor on hover; some argue that we
    should keep the default arrow cursor for buttons */
    cursor: pointer;
    background: var(--theme-color-primary);
    text-transform: uppercase;
    font-weight: normal;
    outline: 0;
    border-radius: 4px;
  }

  ::slotted(button:focus) {
    background: var(--theme-color-help);
  }

  ::slotted(button:hover) {
    text-decoration: underline;
  }

  ::slotted(button:active) {
    filter: brightness(150%);
  }
`;
