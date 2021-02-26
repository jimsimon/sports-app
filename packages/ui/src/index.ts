import './components/theme-provider/theme-provider';
import { LitElement, html, customElement, css } from 'lit-element';

@customElement('hello-world')
export class HelloWorldElement extends LitElement {
  render() {
    return html`<p>Hello World!</p>
      <button>Click Me!</button>`;
  }
}
