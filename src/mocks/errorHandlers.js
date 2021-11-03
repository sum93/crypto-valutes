import { rest } from 'msw'

import { coingecko } from '../utils'

export const errorHandlers = [
  rest.get(coingecko('/api/v3/coins/markets'), (_req, res, ctx) => res(ctx.status(400))),
  rest.get(coingecko('/api/v3/coins/bitcoin'), (_req, res, ctx) => res(ctx.status(400)))
]
