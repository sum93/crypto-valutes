import '@testing-library/jest-dom'
import 'jest-styled-components'

import { server } from '../../src/test-utils'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
