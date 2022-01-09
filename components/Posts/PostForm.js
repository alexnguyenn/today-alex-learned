import dynamic from 'next/dynamic';
import { useState } from 'react'
import { Alert, Box, Button, Modal, TextField, Typography } from '@mui/material'
const SimpleMdeReact = dynamic(
    () => import("react-simplemde-editor"), 
    {ssr: false}
);
import "easymde/dist/easymde.min.css";

const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    py: 2,
    px: 4
}

const PostForm = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [emptyWarning, setEmptyWarning] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        if (props.title.length === 0 || props.description.length === 0) {
            setEmptyWarning(true);
        } else {
            setEmptyWarning(false);
            setModalOpen(true);
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
                defaultValue={props.title}
                onChange={(e) => props.setTitle(e.target.value)}
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
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Box p={2} sx={modalStyles}>
                    <Typography mb={2} variant="h6">
                        Please confirm the password to submit
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        type="password"
                        placeholder="Enter the password here"
                        defaultValue={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                    <Box mt={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                props.formSubmitHandler();
                                setModalOpen(false);
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default PostForm
