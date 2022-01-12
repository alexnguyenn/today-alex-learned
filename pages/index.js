import Head from 'next/head'
import { Fab, Typography, Container, Link as MuiLink } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useSession, signOut } from 'next-auth/react';
import ClientOnly from '../components/ClientOnly';
import Posts, { GET_POSTS, POSTS_FIRST_PAGE } from '../components/Posts/Posts';
import { NextLinkComposed } from '../components/Link';
import { initializeApollo } from '../apollo-client';

export default function Home() {
    const { data: session, status } = useSession();
    const authenticated = status === "authenticated";

    return (
        <Container maxWidth="sx">
            <Head>
                <meta name="description" content="Alex's daily programming-related notes" />
                <title>Today I Learned</title>
            </Head>
            <Container maxWidth="md">
                <Typography mb={1} variant="h3" align="center">Today I Learned</Typography>
                {!authenticated && (
                    <Typography variant="body1" align="center" paragraph>
                        {"Hi there! I am "}
                        <MuiLink href="https://github.com/alexnguyenn/" underline="none">Alex</MuiLink>
                        {". This website is where I keep track of all my programming-related notes. "}
                        <MuiLink href="https://github.com/alexnguyenn/today-alex-learned" underline="none">Source code (Github)</MuiLink>
                    </Typography>
                )}
                {authenticated && (
                    <Typography variant="body1" align="center" paragraph>
                        {`Welcome back, ${session.user.name}! `}
                        <MuiLink href="#" underline="none" onClick={() => signOut()}>Sign out</MuiLink>
                    </Typography>
                )}
            </Container>
            <ClientOnly>
                <Posts />
            </ClientOnly>
            <Fab
                component={NextLinkComposed}
                to="/create"
                color="secondary"
                aria-label="add"
                sx={{
                    position: "fixed",
                    bottom: "1.5rem",
                    right: "1.5rem",
                }}
            >
                <NoteAddIcon />
            </Fab>
        </Container>
    )
}

export async function getStaticProps(context) {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: GET_POSTS,
        variables: {
            first: POSTS_FIRST_PAGE,
        },
    });

    return {
        props: {
            "__APOLLO_STATE__": apolloClient.cache.extract(),
        },
        revalidate: 43200,
    }
}
