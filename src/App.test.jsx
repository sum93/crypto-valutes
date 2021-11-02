import { render, screen, waitForElementToBeRemoved, useErrorHandlers } from './test-utils'
import App from './App'

describe('App', () => {
  it('should render successfully', async () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /\[coins\]/i })).toBeInTheDocument()
    expect(screen.getByTestId('coins-wrapper--loading')).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByTestId('coins-wrapper--loading'))
    expect(screen.getByTestId('coins-wrapper')).toBeInTheDocument()
  })

  it('should display error message if request fails', async () => {
    useErrorHandlers()
    render(<App />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('coins-wrapper--loading'))
    expect(screen.getByTestId('coins-wrapper--error')).toBeInTheDocument()
  })
})
