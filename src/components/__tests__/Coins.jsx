import Coins from '../Coins'
import { render, screen, waitForElementToBeRemoved, useErrorHandlers } from '../../test-utils'

describe('<Coins />', () => {
  it('should load list successfully', async () => {
    render(<Coins />)
    expect(screen.getByTestId('coins-wrapper--loading')).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByTestId('coins-wrapper--loading'))
    expect(screen.getByTestId('coins-wrapper')).toBeInTheDocument()
  })

  it('should handle error correctly', async () => {
    useErrorHandlers()
    render(<Coins />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('coins-wrapper--loading'))
    expect(screen.getByTestId('coins-wrapper--error')).toBeInTheDocument()
  })
})
