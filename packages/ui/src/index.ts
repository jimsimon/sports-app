import { LitElement, html, customElement, css } from 'lit-element';

@customElement('hello-world')
export class HelloWorldElement extends LitElement {
  get styles() {
    return css``;
  }

  render() {
    return html`<p>Hello World!</p>
      <button>Click Me!</button>`;
  }
}
