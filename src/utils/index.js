export const currencyFormatter = Intl.NumberFormat(
  'en-GB',
  {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 6,
    minimumFractionDigits: 2
  }
)

export const dateFormatter = Intl.DateTimeFormat('en-GB')

export const coingecko = (path) => {
  return new URL(path, 'https://api.coingecko.com/').toString()
}
