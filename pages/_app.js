import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo-client'

import '../styles/globals.css'
import theme from '../styles/theme';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const apolloClient = useApollo(pageProps)

    return (
        <ApolloProvider client={apolloClient}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </ApolloProvider>
    )
}

export default MyApp
