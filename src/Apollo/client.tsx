import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const queryProvider = new ApolloClient({
    link: createHttpLink({
        uri: 'https://api.studio.thegraph.com/query/33694/shibarium-517/v0.0.2'
    }),
    cache: new InMemoryCache()
})