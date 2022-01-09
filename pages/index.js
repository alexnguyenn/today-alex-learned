import Head from 'next/head'
import { Fab, Typography, Container, Link as MuiLink } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClientOnly from '../components/ClientOnly'
import Posts from '../components/Posts/Posts'
import { NextLinkComposed } from '../components/Link'

export default function Home() {
    return (
        <Container maxWidth="sx">
            <Head>
                <meta name="description" content="Alex's daily programming-related notes" />
                <title>Today I Learned</title>
            </Head>
            <Container maxWidth="md">
                <Typography variant="h3" align="center">Today I Learned</Typography>
                <Typography variant="body1" align="center" paragraph>
                    {"Hi there! I am "}
                    <MuiLink href="https://github.com/alexnguyenn/" underline="none">Alex</MuiLink>
                    {". This website is where I keep track of all my programming-related notes. "}
                    <MuiLink href="https://github.com/alexnguyenn/today-alex-learned" underline="none">Github</MuiLink>
                </Typography>
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
                <AddBoxIcon />
            </Fab>
        </Container>
    )
}
