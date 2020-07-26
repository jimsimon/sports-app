import { LitElement, html, customElement } from 'lit-element'

@customElement('hello-world')
class HelloWorldElement extends LitElement {
    render() {
        return html`<p>Hello World</p>`
    }
}

document.body.innerHTML = '<hello-world></hello-world>'