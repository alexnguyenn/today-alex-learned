import Head from 'next/head'
import { useState } from 'react'
import { Container, Typography, Box, Backdrop, CircularProgress, Alert, Snackbar } from '@mui/material'
import { initializeApollo } from "../../apollo-client";
import { gql } from "@apollo/client";
import PostForm from "../../components/Posts/PostForm";
import Link from '../../components/Link';

export default function Post({ post }) {
    const [description, setDescription] = useState(post.description);
    const [title, setTitle] = useState(post.title);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const onFormSubmit = async () => {
        setPassword("");
        setError(null);
        setIsSuccess(false);
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setIsLoading(false);
        setIsSuccess(true);
    }

    return (
        <Container maxWidth="sx">
            <Head>
                <title>Create New Post</title>
            </Head>
            <Box 
                mb={2}
                sx = {{
                    display: "flex",
                    gap: ".5rem",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Typography variant="h3" align="center">Edit Post</Typography>
                <Link href="/" underline="none">Back to Home</Link>
            </Box>
            {error && (
                <Alert severity="error" sx={{mb: 2, mx: "auto", maxWidth: "lg"}}>
                    {error.message}
                </Alert>
            )}
            <PostForm 
                title={title}
                description={description}
                setTitle={setTitle}
                setDescription={setDescription}
                setPassword={setPassword}
                onFormSubmit={onFormSubmit}
            />
            <Snackbar open={isSuccess} autoHideDuration={10000} onClose={() => setIsSuccess(false)}>
                <Alert severity="success" onClose={() => setIsSuccess(false)} sx={{ width: "100%" }}>
                    Post editted successfully!
                </Alert>
            </Snackbar>
            <Backdrop 
                open={isLoading} 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    );
}

export async function getServerSideProps(context) {
    const client = initializeApollo(); 
    const { data } = await client.query({
        query: gql`
            query($id: ID!) {
                post(where: {id: $id}) {
                    title
                    description
                }
            }
        `,
        variables: {
            id: context.query["post-id"],
        },
    });

    if (!data.post) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            post: data.post,
        },
    };
}