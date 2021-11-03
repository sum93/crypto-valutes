import App from './App'
import { render, screen, waitForElementToBeRemoved } from './test-utils'

describe('App', () => {
  it('should render correctly', async () => {
    render(<App />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('coins-wrapper--loading'))
    expect(screen.getByRole('main')).toMatchSnapshot()
  })
})
