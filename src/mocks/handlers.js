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
        market_cap_rank: 1,
        fully_diluted_valuation: 1148946919885,
        total_volume: 30306497794,
        high_24h: 54796,
        low_24h: 52164,
        price_change_24h: 1315.59,
        price_change_percentage_24h: 2.46384,
        market_cap_change_24h: 21597327555,
        market_cap_change_percentage_24h: 2.13759,
        circulating_supply: 18861718.0,
        total_supply: 21000000.0,
        max_supply: 21000000.0,
        ath: 57767,
        ath_change_percentage: -5.3818,
        ath_date: '2021-10-20T14:54:17.702Z',
        atl: 51.3,
        atl_change_percentage: 106448.59531,
        atl_date: '2013-07-05T00:00:00.000Z',
        roi: null,
        last_updated: '2021-11-02T14:36:12.849Z'
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
        current_price: 3864.84,
        market_cap: 456479385567,
        market_cap_rank: 2,
        fully_diluted_valuation: null,
        total_volume: 16884550025,
        high_24h: 3869.75,
        low_24h: 3685.46,
        price_change_24h: 99.69,
        price_change_percentage_24h: 2.6477,
        market_cap_change_24h: 10201664946,
        market_cap_change_percentage_24h: 2.28595,
        circulating_supply: 118178986.999,
        total_supply: null,
        max_supply: null,
        ath: 3869.75,
        ath_change_percentage: -0.15556,
        ath_date: '2021-11-02T14:08:01.106Z',
        atl: 0.381455,
        atl_change_percentage: 1012790.8253,
        atl_date: '2015-10-20T00:00:00.000Z',
        roi: {
          times: 93.50893833606852,
          currency: 'btc',
          percentage: 9350.893833606851
        },
        last_updated: '2021-11-02T14:35:58.968Z'
      },
      {
        id: 'binancecoin',
        symbol: 'bnb',
        name: 'Binance Coin',
        image: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615',
        current_price: 478.33,
        market_cap: 80301673697,
        market_cap_rank: 3,
        fully_diluted_valuation: 80301673697,
        total_volume: 1459900484,
        high_24h: 478.36,
        low_24h: 460.0,
        price_change_24h: 15.18,
        price_change_percentage_24h: 3.27742,
        market_cap_change_24h: 2929428742,
        market_cap_change_percentage_24h: 3.78615,
        circulating_supply: 168137035.9,
        total_supply: 168137035.9,
        max_supply: 168137035.9,
        ath: 564.82,
        ath_change_percentage: -15.84106,
        ath_date: '2021-05-10T07:24:17.097Z',
        atl: 0.03359941,
        atl_change_percentage: 1414648.56571,
        atl_date: '2017-10-19T00:00:00.000Z',
        roi: null,
        last_updated: '2021-11-02T14:36:52.049Z'
      }
    ])
  ))
]
