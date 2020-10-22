import { LitElement, html, customElement } from 'lit-element'

@customElement('hello-world')
export class HelloWorldElement extends LitElement {
    render() {
        return html`<p>Hello World</p><button>Click Me</button>`
    }
}
