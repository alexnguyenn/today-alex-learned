import Head from 'next/head'
import { useState } from 'react'
import { Container, Typography, Box, Backdrop, CircularProgress, Alert, Snackbar } from '@mui/material'
import PostForm from '../components/Posts/PostForm';
import Link from '../components/Link';

const NewPost = () => {
    const [description, setDescription] = useState("Write something here...");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const onFormSubmit = async () => {
        setError(null);
        setIsSuccess(false);
        setIsLoading(true);
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description,
            })
        });
        const data = await response.json();
        if (data.status === "error") {
            setError(data.message);
        } else if (data.status === "success") {
            setIsSuccess(true);
            setTitle("");
            setDescription("Write something here...");
        }
        setIsLoading(false);
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
                <Typography variant="h3" align="center">Create new post</Typography>
                <Link href="/" underline="none">Back to Home</Link>
            </Box>
            {error && (
                <Alert severity="error" sx={{mb: 2, mx: "auto", maxWidth: "lg"}}>{error}</Alert>
            )}
            <PostForm 
                title={title}
                description={description}
                setTitle={setTitle}
                setDescription={setDescription}
                onFormSubmit={onFormSubmit}
            />
            <Snackbar open={isSuccess} autoHideDuration={10000} onClose={() => setIsSuccess(false)}>
                <Alert severity="success" onClose={() => setIsSuccess(false)} sx={{ width: "100%" }}>
                    Post created and published successfully!
                </Alert>
            </Snackbar>
            <Backdrop 
                open={isLoading} 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

export default NewPost