import { css } from 'lit-element';

export default css`
  :host {
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
  }

  div {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
  }

  label {
    margin-bottom: 0.5rem;
  }

  input {
    margin-left: 0.25rem;
  }
`;
