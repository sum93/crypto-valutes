import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react';

import ResourceState from '../constants/ResourceState'

const client = axios.create({ baseURL: 'https://api.coingecko.com/api/v3' })

const CoinsContext = createContext({})
export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState({
    ids: [],
    data: {},
    details: {},
    state: ResourceState.PENDING
  });

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await client.get('coins/markets?vs_currency=eur&per_page=10')
        setCoins(prevCoins => ({
          ...prevCoins,
          ids: response.data.map(({ id }) => id),
          data: response.data.reduce((data, nextCoin) => ({
            ...data,
            [nextCoin.id]: nextCoin
          }), {}),
          state: ResourceState.SUCCESS
        }))
      } catch {
        setCoins(prevCoins => ({
          ...prevCoins,
          state: ResourceState.ERROR
        }))
      }
    }

    fetchCoins()
  }, [])

  const getDetails = async (coinId) => {
    if (coins.details[coinId]) {
      return
    }

    setCoins(prevCoins => ({
      ...prevCoins,
      details: {
        ...prevCoins.details,
        [coinId]: {
          state: ResourceState.PENDING,
        }
      }
    }))

    try {
      const response = await client.get(`coins/${coinId}`)
      setCoins(prevCoins => ({
        ...prevCoins,
        details: {
          ...prevCoins.details,
          [coinId]: {
            data: response.data,
            state: ResourceState.SUCCESS
          }
        }
      }))
    } catch {
      setCoins(prevCoins => ({
        ...prevCoins,
        details: {
          ...prevCoins.details,
          [coinId]: {
            state: ResourceState.ERROR
          }
        }
      }))
    }
  }

  const contextValue = {
    coins,
    actions: {
      getDetails
    }
  }

  return (
    <CoinsContext.Provider value={contextValue}>
      {children}
    </CoinsContext.Provider>
  )
}

export const useCoins = () => {
  const coins = useContext(CoinsContext)

  return coins
}
