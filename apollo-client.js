import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
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
    ssrMode: typeof window === "undefined",
    link: createHttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHCMS_API_URI,
        headers: {
            Authorization: typeof window === "undefined" ? `Bearer ${process.env.GRAPHCMS_API_PAT}` : "",
        },
    }),
    cache: cache,
});

export default client;
