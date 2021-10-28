import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react';

import ResourceState from '../constants/ResourceState'

const client = axios.create({ baseURL: 'https://api.coingecko.com/api/v3' })

const CoinsContext = createContext({})
export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState({
    data: [],
    state: ResourceState.PENDING
  });

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await client.get('coins/markets?vs_currency=eur&per_page=10')
        setCoins({
          data: response.data,
          state: ResourceState.SUCCESS
        })
      } catch {
        setCoins(prevCoins => ({
          ...prevCoins,
          state: ResourceState.ERROR
        }))
      }
    }

    fetchCoins()
  }, [])

  return (
    <CoinsContext.Provider value={coins}>
      {children}
    </CoinsContext.Provider>
  )
}

export const useCoins = () => {
  const coins = useContext(CoinsContext)

  return coins
}
