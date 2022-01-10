import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { relayStylePagination } from "@apollo/client/utilities";
import { useMemo } from "react";

let apolloClient;

const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: createHttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHCMS_API_URI,
            headers: {
                Authorization: typeof window === "undefined" ? `Bearer ${process.env.GRAPHCMS_API_PAT}` : "",
            },
        }),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        postsConnection: relayStylePagination(),
                    },
                },
            },
        }),
    });
};

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState && !apolloClient) {
        // Hydrate the cache using the data passed from getStaticProps/getServerSideProps
        _apolloClient.cache.restore(initialState);
    }

    // For server-side always create a new client
    if (typeof window === "undefined") return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(pageProps) {
    // Calls initializeApollo() to get an instance of Apollo Client that has Apollo’s cache data added to it. 
    // This client is ultimately passed in as a prop to the ApolloProvider component in _app.js.
    const state = pageProps["__APOLLO_STATE__"];
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}
