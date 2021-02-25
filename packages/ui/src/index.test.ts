import '@testing-library/jest-dom';
import './index';
import { render, html } from 'lit-html';
import userEvent from '@testing-library/user-event';

let element: HTMLElement;
beforeEach(() => {
  render(html`<hello-world></hello-world>`, document.body);
  element = document.querySelector('hello-world');
});

describe('<hello-world>', () => {
  test('it works', () => {
    expect(
      element.shadowRoot.firstElementChild as HTMLElement,
    ).toHaveTextContent('Hello World');
  });

  test('it works too', () => {
    const onclick = jest.fn();
    element.onclick = onclick;

    userEvent.click(element.shadowRoot.querySelector('button'));
    expect(onclick).toHaveBeenCalled();
  });

  test('isolation', () => {
    expect(document.querySelectorAll('hello-world')).toHaveLength(1);
  });
});
