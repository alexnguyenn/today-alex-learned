import Head from 'next/head'
import { Container, Typography } from '@mui/material'

export default function NewPost() {
    return (
        <Container maxWidth="sx">
            <Head>
                <title>Create New Post</title>
            </Head>
            <Typography variant="h4" mt={2}>Create New Post</Typography>
        </Container>
    )
}
