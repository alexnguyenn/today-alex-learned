import Head from 'next/head'
import { useState } from 'react'
import { Button, Container, Typography, Box, Backdrop, CircularProgress, Alert, AlertTitle, Snackbar } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useSession, signIn } from "next-auth/react";
import PostForm from '../components/Posts/PostForm';
import Link from '../components/Link';
import PostSubmitDialog from '../components/Posts/PostSubmitDialog';

const NewPost = () => {
    const { status } = useSession();
    const [description, setDescription] = useState("Write something here...");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const authenticated = status === "authenticated";

    const submitHandler = (event) => {
        event.preventDefault();
        if (title.length === 0 || description.length === 0) {
            setError("Title and description cannot be empty!");
        } else {
            setError(null);
            setDialogOpen(true);
        }
    }

    const onFormSubmit = async () => {
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
        setIsLoading(false);
        if (data.status === "error") {
            setError(data.message);
        } else if (data.status === "success") {
            setIsSuccess(true);
            setTitle("");
            setDescription("Write something here...");
        }
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
            {!authenticated && (
                <Alert 
                    severity="warning" 
                    sx={{mb: 2, mx: "auto", maxWidth: "lg"}}
                    action={
                        <Button color="inherit" onClick={() => signIn()}>Sign In</Button>
                    } 
                >
                    <AlertTitle>This form is protected!</AlertTitle>
                    You need to be logged in to create a new post.
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{mb: 2, mx: "auto", maxWidth: "lg"}}>{error}</Alert>
            )}
            <PostForm
                title={title}
                description={description}
                setTitle={setTitle}
                setDescription={setDescription}
            />
            <Box mt={2} mx="auto" maxWidth="lg" display="flex" gap={1} flexDirection="row-reverse">
                <Button
                    variant="contained"
                    sx={{ width: {"xs": "100%", "md": "15%"} }}
                    onClick={submitHandler}
                    endIcon={<NoteAddIcon />}
                    disabled={!authenticated || isLoading}
                >
                    Create Post
                </Button>
            </Box>
            <PostSubmitDialog
                dialogOpen={dialogOpen}
                closeDialog={() => setDialogOpen(false)}
                onSubmit={onFormSubmit}
                dialogBody="Are you sure you want to submit this post?"
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