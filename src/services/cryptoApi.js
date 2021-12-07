import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPID_HOST,
    'x-rapidapi-key': process.env.REACT_APP_CRYPTO_RAPID_API_KEY
}

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL

const createRequest = url => ({
    url,
    headers: cryptoApiHeaders
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: builder => ({
        getCryptos: builder.query({
            query: count => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: coinId => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({
                coinId,
                timePeriod
            }) => createRequest(`/coin/${coinId}/history/${timePeriod}`)
        }),
        getExchanges: builder.query({
            query: () => createRequest(`/exchanges`)
        })
    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetExchangesQuery
} = cryptoApi