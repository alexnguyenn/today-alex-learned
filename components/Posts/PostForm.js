import dynamic from 'next/dynamic';
import { Box, TextField, Typography } from '@mui/material'
const SimpleMdeReact = dynamic(
    () => import("react-simplemde-editor"),
    {ssr: false}
);
import "easymde/dist/easymde.min.css";

const PostForm = ({ title, setTitle, description, setDescription }) => {
    return (
        <Box mx="auto" maxWidth="lg">
            <Typography variant="h6">Title</Typography>
            <TextField
                fullWidth
                variant="outlined"
                required
                placeholder="Enter the title here"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <Typography mt={2} variant="h6">Description</Typography>
            <SimpleMdeReact
                value={description}
                onChange={setDescription}
            />
        </Box>
    )
}

export default PostForm
