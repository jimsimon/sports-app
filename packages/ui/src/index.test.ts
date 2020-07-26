import './index.ts'
import { within } from '@testing-library/dom'

beforeEach(() => {
    document.body.innerHTML = `<hello-world></hello-world>`
})

test('it works', () => {
    const element = document.querySelector('hello-world') as HTMLElement
    const { getByText } = within(element.shadowRoot.getRootNode() as HTMLElement)
    const text = getByText('Hello World')
    expect(text).toBeInTheDocument()
})