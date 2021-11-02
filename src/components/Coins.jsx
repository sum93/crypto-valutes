import styled from 'styled-components'

import Coin from './Coin'
import Color from '../constants/Color'
import ResourceState from '../constants/ResourceState'
import { useCoins } from '../hooks/useCoins'

const LoadingMessage = styled.div`
  font-size: 1.25rem;
  line-height: 5;
  text-align: center;
  color: ${Color.HeliotropeGray};
`

const ErrorMessage = styled.div`
  font-size: 1.25rem;
  line-height: 1.25;
  text-align: center;
  color: ${Color.DarkSalmon};
`

const Coins = () => {
  const { coins } = useCoins()

  if (coins.state === ResourceState.PENDING) {
    return <LoadingMessage>Loading...</LoadingMessage>
  }

  if (coins.state === ResourceState.ERROR) {
    return <ErrorMessage>An error has occurred. Please refresh the page.</ErrorMessage>
  }

  return coins.ids.map((coinId) => (
    <Coin key={coinId} id={coinId} />
  ))
}

export default Coins
