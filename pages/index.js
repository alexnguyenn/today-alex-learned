import Head from 'next/head'
import ClientOnly from '../components/ClientOnly'
import Posts from '../components/Posts/Posts'
import { Typography, Container, Link } from '@mui/material'

export default function Home() {
    return (
        <Container maxWidth="sx">
            <Head>
                <meta name="description" content="Alex's daily programming-related notes" />
                <title>Today I Learned</title>
            </Head>
            <Container maxWidth="md" sx={{pt: 2}}>
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
        </Container>
    )
}
