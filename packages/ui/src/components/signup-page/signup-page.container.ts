import { LitElement, html, customElement, css } from 'lit-element';
import './signup-page.view';

@customElement('signup-page')
export class SignupPageContainer extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<signup-page-view></signup-page-view>`;
  }
}
