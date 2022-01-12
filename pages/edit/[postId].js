import Head from 'next/head'
import { useState } from 'react'
import { Container, Typography, Box, Backdrop, CircularProgress, Alert, Snackbar, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { initializeApollo } from "../../apollo-client";
import { gql } from "@apollo/client";
import PostForm from "../../components/Posts/PostForm";
import Link from '../../components/Link';
import PostSubmitDialog from "../../components/Posts/PostSubmitDialog";

export default ({ post }) => {
    const [description, setDescription] = useState(post.description);
    const [title, setTitle] = useState(post.title);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [unpublishDialogOpen, setUnpublishDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    const submitHandler = (event, isUpdateSubmit) => {
        event.preventDefault();
        if (title.length === 0 || description.length === 0) {
            setError("Title and description cannot be empty!");
        } else {
            setError(null);
            if (isUpdateSubmit) {
                setUpdateDialogOpen(true);
            } else {
                setUnpublishDialogOpen(true);
            }
        }
    }

    const onPostUpdate = async () => {
        setIsSuccess(false);
        setIsLoading(true);
        const response = await fetch(`/api/posts/${post.id}`, {
            method: "PUT",
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
        }
    }

    const onPostUnpublish = async () => {
        setIsSuccess(false);
        setIsLoading(true);
        const response = await fetch(`/api/posts/${post.id}`, {
            method: "DELETE",
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
        }
    }

    return (
        <Container maxWidth="sx">
            <Head>
                <title>Edit Post</title>
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
                <Typography variant="h3" align="center">Edit post</Typography>
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
            />
            <Box mt={2} mx="auto" maxWidth="lg" display="flex" gap={1} flexDirection="row-reverse">
                <Button
                    variant="contained"
                    sx={{ width: {"xs": "100%", "md": "15%"} }}
                    onClick={(e) => submitHandler(e, true)}
                    endIcon={<EditIcon />}
                >
                    Update
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    sx={{ width: {"xs": "100%", "md": "15%"} }}
                    onClick={(e) => submitHandler(e, false)}
                    startIcon={<DeleteIcon />}
                >
                    Unpublish
                </Button>
            </Box>
            <PostSubmitDialog
                dialogOpen={updateDialogOpen}
                closeDialog={() => setUpdateDialogOpen(false)}
                onSubmit={onPostUpdate}
                dialogTitle="Update"
                dialogBody="Do you want to update this post?"
            />
            <PostSubmitDialog
                dialogOpen={unpublishDialogOpen}
                closeDialog={() => setUnpublishDialogOpen(false)}
                onSubmit={onPostUnpublish}
                dialogTitle="Confirm unpublish"
                dialogBody="Do you want to unpublish this post?"
            />
            <Snackbar open={isSuccess} autoHideDuration={10000} onClose={() => setIsSuccess(false)}>
                <Alert severity="success" onClose={() => setIsSuccess(false)} sx={{ width: "100%" }}>
                    Post updated successfully!
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
                    id
                    title
                    description
                }
            }
        `,
        variables: {
            id: context.query["postId"],
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