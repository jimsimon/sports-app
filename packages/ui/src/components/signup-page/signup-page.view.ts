import { LitElement, html, customElement, property } from 'lit-element';
import styles from './signup-page.view.css';

@customElement('signup-page-view')
export class SignupPageView extends LitElement {
  @property()
  email = '';

  @property()
  password = '';

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <div>
        <label>
          <input value="${this.email}" />
        </label>
        <label>
          E-mail Address:
          <input value="${this.email}" />
        </label>
        <label>
          Password:
          <input type="password" value="${this.password}" />
        </label>
        <label>
          Confirm Password:
          <input type="password" value="${this.password}" />
        </label>
        <button>Log In</button>
      </div>
    `;
  }
}
