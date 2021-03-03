import { css, customElement, html, LitElement } from 'lit-element';

@customElement('visually-hidden')
export class VisuallyHidden extends LitElement {
  static get styles() {
    return css`
      :host {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }
}
