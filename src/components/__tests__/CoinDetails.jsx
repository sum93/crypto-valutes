import CoinDetails from '../CoinDetails'
import { render, screen, waitForElementToBeRemoved, useErrorHandlers } from '../../test-utils'

describe('<CoinDetails />', () => {
  it('should render correctly', async () => {
    render(<CoinDetails id="bitcoin" />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('coin-details--loading'))
    expect(screen.getByTestId('coin-details')).toMatchSnapshot()
  })

  it('should load data successfully', async () => {
    render(<CoinDetails id="bitcoin" />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('coin-details--loading'))
    expect(screen.getByTestId('coin-details')).toBeInTheDocument()
  })

  it('should handle error correctly', async () => {
    useErrorHandlers()
    render(<CoinDetails id="bitcoin" />)
    await waitForElementToBeRemoved(() => screen.queryByTestId('coin-details--loading'))
    expect(screen.getByTestId('coin-details--error')).toBeInTheDocument()
  })
})
