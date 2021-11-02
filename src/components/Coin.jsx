import styled from 'styled-components'
import { useState } from 'react'

import Breakpoint from '../constants/Breakpoint'
import CoinDetails from './CoinDetails'
import Color from '../constants/Color'
import { currencyFormatter } from '../utils'
import { useCoins } from '../hooks/useCoins'

const CoinWrapper = styled.div`
display: grid;
grid-template-columns: min-content 4rem 1fr 1fr 5rem;
grid-template-rows: 1fr 1fr;
grid-template-areas:
  "logo symbol name current high"
  "logo symbol name current low"
  "details details details details details";
column-gap: 1rem;
width: 100%;
padding: 0.5rem 1.25rem;
border-radius: 1rem;
color: ${Color.DimGray};
background-color: ${Color.White};
cursor: pointer;

@media (max-width: ${Breakpoint.SM}) {
  grid-template-columns: 4rem 1fr 1fr;
  grid-template-rows: repeat(4, auto);
  grid-template-areas:
    "logo name high"
    "logo name current"
    "logo symbol current"
    "logo symbol low"
    "details details details";
  padding: 1.25rem;
}
`

const CoinLogo = styled.img`
grid-area: logo;
align-self: center;
height: 2.5rem;
width: 2.5rem;

@media (max-width: ${Breakpoint.SM}) {
  height: 4rem;
  width: 4rem;
}
`

const CoinSymbol = styled.span`
grid-area: symbol;
justify-self: end;
align-self: center;
font-size: 1.25rem;

@media (max-width: ${Breakpoint.SM}) {
  justify-self: start;
  align-self: start;
}
`

const CoinName = styled.span`
grid-area: name;
align-self: center;
font-size: 1.25rem;

@media (max-width: ${Breakpoint.SM}) {
  align-self: end;
}
`

const CoinCurrent = styled.span`
grid-area: current;
justify-self: end;
align-self: center;
font-size: 1.25rem;

@media (max-width: ${Breakpoint.SM}) {
  font-size: 1rem;
}
`

const CoinHigh = styled.span`
grid-area: high;
justify-self: start;
align-self: center;
font-size: 0.875rem;
color: ${Color.ShinyShamrock};

@media (max-width: ${Breakpoint.SM}) {
  justify-self: end;
  align-self: start;
}
`

const CoinLow = styled.span`
grid-area: low;
justify-self: start;
align-self: center;
font-size: 0.875rem;
color: ${Color.DarkSalmon};

@media (max-width: ${Breakpoint.SM}) {
  justify-self: end;
  align-self: end;
}
`

const Coin = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { coins: { data: { [id]: coin } } } = useCoins()

  const handleClick = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  if (!coin) {
    return null
  }

  return (
    <CoinWrapper onClick={handleClick}>
      <CoinLogo src={coin.image} />
      <CoinSymbol>{`[${coin.symbol}]`}</CoinSymbol>
      <CoinName>{coin.name}</CoinName>
      <CoinCurrent>{currencyFormatter.format(coin.current_price)}</CoinCurrent>
      <CoinHigh>{currencyFormatter.format(coin.high_24h)}</CoinHigh>
      <CoinLow>{currencyFormatter.format(coin.low_24h)}</CoinLow>
      {isOpen && <CoinDetails id={id} />}
    </CoinWrapper>
  )
}

export default Coin
