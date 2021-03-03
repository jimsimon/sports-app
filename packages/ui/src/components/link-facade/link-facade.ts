import { customElement, html, LitElement } from 'lit-element';
import styles from './link-facade.css';

@customElement('link-facade')
export default class PrimaryButtonFacade extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`<slot></slot>`;
  }
}
