import { ApolloClient, InMemoryCache } from "@apollo/client"
import { relayStylePagination } from '@apollo/client/utilities';

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                postsConnection: relayStylePagination(),
            },
        },
    },
});

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHCMS_API_URI,
    cache: cache,
});

export default client;
