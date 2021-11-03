import Coin from '../Coin'
import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from '../../test-utils'

describe('<Coin />', () => {
  it('should render correctly', async () => {
    render(<Coin id="bitcoin" />)
    await waitFor(() => screen.findByTestId('coin-wrapper'))
    expect(screen.getByTestId('coin-wrapper')).toMatchSnapshot()
  })

  it('should display <CoinDetails /> when clicked on', async () => {
    render(<Coin id="bitcoin" />)
    await waitFor(() => screen.findByTestId('coin-wrapper'))
    expect(screen.getByTestId('coin-wrapper')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('coin-wrapper'))
    await waitForElementToBeRemoved(() => screen.queryByTestId('coin-details--loading'))
    expect(screen.getByTestId('coin-details')).toBeInTheDocument()
  })
})
