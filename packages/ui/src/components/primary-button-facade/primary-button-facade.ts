import { customElement, html, LitElement } from 'lit-element';
import styles from './primary-button-facade.css';

@customElement('primary-button-facade')
export default class PrimaryButtonFacade extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`<slot></slot>`;
  }
}
