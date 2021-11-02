import { rest } from 'msw'

import { coingecko } from '../utils'

export const handlers = [
  rest.get(coingecko('/api/v3/coins/markets'), (_req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        current_price: 54712,
        market_cap: 1031957752373,
        high_24h: 54796,
        low_24h: 52164
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
        current_price: 3864.84,
        market_cap: 456479385567,
        high_24h: 3869.75,
        low_24h: 3685.46
      },
      {
        id: 'binancecoin',
        symbol: 'bnb',
        name: 'Binance Coin',
        image: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615',
        current_price: 478.33,
        market_cap: 80301673697,
        high_24h: 478.36,
        low_24h: 460.0
      }
    ])
  ))
]
