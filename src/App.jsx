import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const client = axios.create({ baseURL: 'https://api.coingecko.com/api/v3' })

const Breakpoint = {
  SM: '600px'
}

const Color = {
  DarkSalmon: '#EEA081',
  DimGray: '#62616b',
  HeliotropeGray: '#978897',
  Isabelline: '#ece9ec',
  ShinyShamrock: '#71B48D',
  White: '#FCFCFC'
}

const DataState = {
  PENDING: 'PENDING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
}

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${Color.Isabelline};
  font-family: 'Roboto', sans-serif;
`

const Content = styled.section`
  max-width: 768px;
  width: 100%;
  padding: 2rem 1rem;
`

const Title = styled.h1`
  margin-bottom: 1.25rem;
  font-size: 4rem;
  line-height: 1.25;
  text-align: center;
  color: ${Color.DimGray};
`

const Coin = styled.div`
  display: grid;
  grid-template-columns: min-content 4rem 1fr 1fr 6rem;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "logo symbol name current high"
    "logo symbol name current low";
  column-gap: 1.25rem;
  width: 100%;
  padding: 0.5rem 1.25rem;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
  color: ${Color.DimGray};
  background-color: ${Color.White};

  @media (max-width: ${Breakpoint.SM}) {
    grid-template-columns: 4rem 1fr 1fr;
    grid-template-rows: repeat(4, auto);
    grid-template-areas:
      "logo name high"
      "logo name current"
      "logo symbol current"
      "logo symbol low";
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

const CoinName = styled.span`
  grid-area: name;
  align-self: center;
  font-size: 1.25rem;

  @media (max-width: ${Breakpoint.SM}) {
    align-self: end;
  }
`

const CoinSymbol = styled.span`
  grid-area: symbol;
  align-self: center;
  font-size: 1.25rem;

  @media (max-width: ${Breakpoint.SM}) {
    align-self: start;
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

const LoadingMessage = styled.div`
  font-size: 1.25rem;
  line-height: 5;
  text-align: center;
  color: ${Color.HeliotropeGray};
`

const ErrorMessage = styled.div`
  font-size: 1.25rem;
  line-height: 1.25;
  color: ${Color.DarkSalmon};
`

function App() {
  const [coins, setCoins] = useState({
    data: [],
    state: DataState.PENDING
  });
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await client.get('coins/markets?vs_currency=eur&per_page=10')
        setCoins({
          data: response.data,
          state: DataState.SUCCESS
        })
      } catch {
        setCoins(prevCoins => ({
          ...prevCoins,
          state: DataState.ERROR
        }))
      }
    }

    fetchCoins()
  }, [])

  return (
    <Layout>
      <Content>
        <Title>[Coins]</Title>
        {coins.state === DataState.PENDING && (
          <LoadingMessage>Loading...</LoadingMessage>
        )}
        {coins.state === DataState.SUCCESS && coins.data.map((coin) => (
          <Coin key={coin.id}>
            <CoinLogo src={coin.image} />
            <CoinSymbol>{`[${coin.symbol}]`}</CoinSymbol>
            <CoinName>{coin.name}</CoinName>
            <CoinCurrent>{`${coin.current_price} €`}</CoinCurrent>
            <CoinHigh>{`${coin.high_24h} €`}</CoinHigh>
            <CoinLow>{`${coin.low_24h} €`}</CoinLow>
          </Coin>
        ))}
        {coins.state === DataState.ERROR && (
          <ErrorMessage>An error has occurred. Please refresh the page.</ErrorMessage>
        )}
      </Content>
    </Layout>
  )
}

export default App
