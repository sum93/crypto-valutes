/* eslint-disable import/export */

import { render } from '@testing-library/react'
import { setupServer } from 'msw/node'

import { CoinsProvider } from './hooks/useCoins'
import { errorHandlers } from './mocks/errorHandlers'
import { handlers } from './mocks/handlers'

export const server = setupServer(...handlers)
export const useErrorHandlers = () => server.use(...errorHandlers)

const AllTheProviders = ({ children }) => {
  return (
    <CoinsProvider>
      {children}
    </CoinsProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
