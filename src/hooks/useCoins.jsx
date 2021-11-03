import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

import ResourceState from '../constants/ResourceState'
import { coingecko } from '../utils'

// Creating a context which will be encapsuled within this file
const CoinsContext = createContext({})

// The provider component is exposed with its data
export const CoinsProvider = ({ children }) => {
  // Defining coins data with initial state and initializing it with a loading state
  const [coins, setCoins] = useState({
    ids: [],
    data: {},
    details: {},
    state: ResourceState.PENDING
  })

  // Loading currencies list on first render
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(coingecko('api/v3/coins/markets?vs_currency=eur&per_page=10'))
        // Update list with freshly fetched data
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
        // In case of an error the resource state will be updated to represent teh failure
        setCoins(prevCoins => ({
          ...prevCoins,
          state: ResourceState.ERROR
        }))
      }
    }

    fetchCoins()
  }, [])

  // Function extracted via context to fetch additional details
  const getDetails = async (coinId) => {
    // If the coin is already fetched then the function will not fire a new request
    if (coins.details[coinId]) {
      return
    }

    // Updating the state to represent loading state
    setCoins(prevCoins => ({
      ...prevCoins,
      details: {
        ...prevCoins.details,
        [coinId]: {
          state: ResourceState.PENDING
        }
      }
    }))

    try {
      const response = await axios.get(coingecko(`api/v3/coins/${coinId}`))
      // Updating state with freshly fetched coin details
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
      // If fetching details fails then an error state will be set
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

  // Creating the value object which will be exposed through the Context API
  const contextValue = {
    coins,
    actions: {
      getDetails
    }
  }

  // Returning the wrapping provider which provides the context across children elements
  return (
    <CoinsContext.Provider value={contextValue}>
      {children}
    </CoinsContext.Provider>
  )
}

// Encapsulating the context object and only expose the data stored in it
export const useCoins = () => {
  const coins = useContext(CoinsContext)

  return coins
}
