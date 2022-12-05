import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const queryProvider = new ApolloClient({
    link: createHttpLink({
        uri: 'https://api.studio.thegraph.com/query/33694/shibarium-v3/v0.0.10'
    }),
    cache: new InMemoryCache()
})