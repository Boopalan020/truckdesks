// Converts Amounts to indian denomination
export const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);

// CORS server API

// export const apiOrigin = "https://localhost:3000"
export const apiOrigin = "https://truckdesks.herokuapp.com"
// export const apiOrigin  = "http://localhost:3001"