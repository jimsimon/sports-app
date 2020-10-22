import { LitElement, html, customElement } from 'lit-element'

@customElement('hello-world')
class HelloWorldElement extends LitElement {
    render() {
        return html`<p>Hello World</p><button>Click Me</button>`
    }
}

document.body.innerHTML = '<hello-world></hello-world>'