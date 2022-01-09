import Head from 'next/head'
import ClientOnly from '../components/ClientOnly'
import Posts from '../components/Posts/Posts'
import { Fab, Typography, Container, Link } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';

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
                    <Link href="https://github.com/alexnguyenn/" underline="none">Alex</Link>
                    {". This website is where I keep track of all my programming-related notes. "}
                    <Link href="https://github.com/alexnguyenn/today-alex-learned" underline="none">Github</Link>
                </Typography>
            </Container>
            <ClientOnly>
                <Posts />
            </ClientOnly>
            <Fab 
                color="secondary" 
                aria-label="add" 
                sx={{
                    position: "fixed",
                    bottom: "1.5rem",
                    right: "1.5rem",
                }}
                href="/create"
            >
                <AddBoxIcon />
            </Fab>
        </Container>
    )
}
