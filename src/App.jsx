import styled from 'styled-components'

import Coins from './components/Coins'
import Color from './constants/Color'

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

const App = () => (
  <Layout>
    <Content>
      <Title>[Coins]</Title>
      <Coins />
    </Content>
  </Layout>
)

export default App
