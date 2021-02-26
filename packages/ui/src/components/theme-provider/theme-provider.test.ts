import '@testing-library/jest-dom';
import { render, html } from 'lit-html';
import './theme-provider';
import { ThemeProvider } from './theme-provider';

type ThemeHtmlStyle = {
  ['--theme-background-primary']: string;
  ['--theme-color-primary']: string;
};

let element: ThemeProvider;
beforeEach(() => {
  render(html`<theme-provider></theme-provider>`, document.body);
  element = document.querySelector('theme-provider');
});

const getThemeHtmlStyle = () => {
  const styleElement: HTMLStyleElement = document.querySelector('#theme');
  if (styleElement) {
    const rule = styleElement.sheet.cssRules[0] as CSSStyleRule;
    expect(rule.selectorText).toEqual('html');
    return (rule.style as unknown) as ThemeHtmlStyle;
  }
  throw new Error('Failed to find html style rule');
};

describe('<theme-provider>', () => {
  test('it defaults to dark theme', () => {
    const style = getThemeHtmlStyle();
    expect(style['--theme-background-primary']).toEqual('darkgray');
    expect(style['--theme-color-primary']).toEqual('white');
  });

  test('it allows changing the theme on the fly', async () => {
    element.theme = 'light';

    // force redraw
    await new Promise((resolve) => setTimeout(resolve, 0));

    const style = getThemeHtmlStyle();
    expect(style['--theme-background-primary']).toEqual('white');
    expect(style['--theme-color-primary']).toEqual('darkgray');
  });
});
