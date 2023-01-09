import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const queryProvider = new ApolloClient({
    link: createHttpLink({
        uri: process.env.SUBH_GRAPH_URL
    }),
    cache: new InMemoryCache()
})