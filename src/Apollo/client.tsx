import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const queryProvider = new ApolloClient({
    link: createHttpLink({
        uri: 'https://api.studio.thegraph.com/query/33694/shibarium-v3/v0.0.5'
    }),
    cache: new InMemoryCache(),
    //  batching means sending multiple queries to the server in one request
    // shouldBatch: true
})