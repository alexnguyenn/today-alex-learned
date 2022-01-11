import dynamic from 'next/dynamic';
import { useState } from 'react'
import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
const SimpleMdeReact = dynamic(
    () => import("react-simplemde-editor"), 
    {ssr: false}
);
import "easymde/dist/easymde.min.css";

const PostForm = (props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [emptyWarning, setEmptyWarning] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        if (props.title.length === 0 || props.description.length === 0) {
            setEmptyWarning(true);
        } else {
            setEmptyWarning(false);
            setDialogOpen(true);
        }
    }

    return (
        <Box mx="auto" maxWidth="lg">
            {emptyWarning && (
                <Alert severity="error" sx={{mb: 2}}>
                    Title and description cannot be empty!
                </Alert>
            )}
            <Typography variant="h6">Title</Typography>
            <TextField 
                fullWidth 
                variant="outlined" 
                required 
                placeholder="Enter the title here" 
                value={props.title}
                onChange={(event) => props.setTitle(event.target.value)}
            />
            <Typography mt={2} variant="h6">Description</Typography>
            <SimpleMdeReact 
                value={props.description}
                onChange={props.setDescription}
            />
            <Button 
                variant="contained" 
                sx={{float: "right", mt: 2, width: {"xs": "100%", "md": "15%"}}}
                onClick={submitHandler}
            >
                Submit
            </Button>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Confirm Submission</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to submit this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => {
                        props.onFormSubmit();
                        setDialogOpen(false);
                    }}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default PostForm
