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
  )),
  rest.get(coingecko('/api/v3/coins/bitcoin'), (_req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      hashing_algorithm: 'SHA-256',
      description: {
        en: 'Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the \u003ca href="https://www.coingecko.com/en?hashing_algorithm=SHA-256"\u003eSHA-256\u003c/a\u003e hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as \u003ca href="https://www.coingecko.com/en/coins/litecoin"\u003eLitecoin\u003c/a\u003e, \u003ca href="https://www.coingecko.com/en/coins/peercoin"\u003ePeercoin\u003c/a\u003e, \u003ca href="https://www.coingecko.com/en/coins/primecoin"\u003ePrimecoin\u003c/a\u003e, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by \u003ca href="https://www.coingecko.com/en/coins/ethereum"\u003eEthereum\u003c/a\u003e which led to the development of other amazing projects such as \u003ca href="https://www.coingecko.com/en/coins/eos"\u003eEOS\u003c/a\u003e, \u003ca href="https://www.coingecko.com/en/coins/tron"\u003eTron\u003c/a\u003e, and even crypto-collectibles such as \u003ca href="https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos"\u003eCryptoKitties\u003c/a\u003e.'
      },
      links: {
        homepage: ['http://www.bitcoin.org', '', '']
      },
      genesis_date: '2009-01-03',
      market_data: {
        market_cap: {
          eur: 1027096492610
        }
      }
    })
  ))
]
