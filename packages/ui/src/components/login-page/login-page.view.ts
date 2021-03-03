import { LitElement, html, customElement, property } from 'lit-element';
import styles from './login-page.view.css';
import '../primary-button-facade/primary-button-facade';
import '../link-facade/link-facade';
import '../visually-hidden/visually-hidden';
import '../text-input-facade/text-input-facade';

@customElement('login-page-view')
export class LoginPageView extends LitElement {
  @property()
  email = '';

  @property()
  password = '';

  @property()
  onSignup: (event: Event) => boolean;

  @property()
  onForgotPassword: (event: Event) => boolean;

  @property()
  onLogin: ({ email, password }: { email: string; password: string }) => void;

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <main>
        <h1>Log in to SportsApp</h1>
        <div id="content">
          <div id="form">
            <label>
              <visually-hidden>E-mail address</visually-hidden>
              <text-input-facade>
                <input
                  placeholder="E-mail Address"
                  value="${this.email}"
                  @input="${this.handleEmailChange}"
                />
              </text-input-facade>
            </label>
            <label>
              <visually-hidden>Password</visually-hidden>
              <text-input-facade>
                <input
                  type="password"
                  placeholder="Password"
                  value="${this.password}"
                  @input="${this.handlePasswordChange}"
                />
              </text-input-facade>
            </label>
            <primary-button-facade>
              <button @click="${this.handleLogIn}">Log In</button>
            </primary-button-facade>
            <div id="links">
              <link-facade>
                <a href="forgot-password" @click="${this.onForgotPassword}">
                  Forgot Password?
                </a>
              </link-facade>
              <link-facade>
                <a href="signup" @click="${this.onSignup}">Sign Up</a>
              </link-facade>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  handleEmailChange(event: Event) {
    this.email = (event.currentTarget as HTMLInputElement).value;
  }

  handlePasswordChange(event: Event) {
    this.password = (event.currentTarget as HTMLInputElement).value;
  }

  handleLogIn() {
    this.onLogin({
      email: this.email,
      password: this.password,
    });
  }
}
