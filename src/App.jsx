import styled from 'styled-components'

import Coin from './components/Coin'
import Color from './constants/Color'
import ResourceState from './constants/ResourceState'
import { useCoins } from './hooks/useCoins'

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

function App() {
  const { coins } = useCoins()

  return (
    <Layout>
      <Content>
        <Title>[Coins]</Title>
        {coins.state === ResourceState.PENDING && (
          <LoadingMessage>Loading...</LoadingMessage>
        )}
        {coins.state === ResourceState.SUCCESS && coins.data.map((coin) => (
          <Coin key={coin.id} {...coin} />
        ))}
        {coins.state === ResourceState.ERROR && (
          <ErrorMessage>An error has occurred. Please refresh the page.</ErrorMessage>
        )}
      </Content>
    </Layout>
  )
}

export default App
