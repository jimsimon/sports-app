import { customElement, html, LitElement, property } from 'lit-element';
import { render as litRender } from 'lit-html';

export type Theme = 'dark' | 'light';

@customElement('theme-provider')
export class ThemeProvider extends LitElement {
  @property()
  theme: Theme = 'dark';

  render() {
    let themeStyle = document.querySelector('#theme') as HTMLStyleElement;
    if (!themeStyle) {
      themeStyle = document.createElement('style');
      themeStyle.id = 'theme';
      document.head.appendChild(themeStyle);
    }

    import(`./${this.theme}.ts`).then((cssModule) => {
      litRender(cssModule.default, themeStyle);
    });

    return html`<slot></slot>`;
  }
}
