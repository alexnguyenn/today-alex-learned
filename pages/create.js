import Head from 'next/head'
import { useState } from 'react'
import { Container, Typography, Link, Box } from '@mui/material'
import PostForm from '../components/Posts/PostForm';

const NewPost = () => {
    const [description, setDescription] = useState("Write something here...");
    const [title, setTitle] = useState("");
    const [password, setPassword] = useState("");

    const formSubmitHandler = () => {
        console.log("Form submitted!");
        console.log(description);
        console.log(title);
        console.log(password);
        setPassword("");
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
            <PostForm 
                title={title}
                description={description}
                setTitle={setTitle}
                setDescription={setDescription}
                setPassword={setPassword}
                formSubmitHandler={formSubmitHandler}
            />
        </Container>
    )
}

export default NewPost