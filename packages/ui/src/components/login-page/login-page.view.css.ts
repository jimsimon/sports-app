import { css } from 'lit-element';

export default css`
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #form {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
  }

  h1 {
    align-self: center;
  }

  label {
    margin-bottom: 1rem;
  }

  #links {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 1rem;
    text-align: center;
  }
`;
