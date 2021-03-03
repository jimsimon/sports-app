import { customElement, html, LitElement } from 'lit-element';
import styles from './text-input-facade.css';

@customElement('text-input-facade')
export default class TextInputFacade extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`<slot></slot>`;
  }
}
