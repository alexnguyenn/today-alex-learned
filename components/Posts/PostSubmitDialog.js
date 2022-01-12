import { Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';

const PostSubmitDialog = ({
    dialogOpen,
    closeDialog,
    onSubmit,
    dialogTitle = "Confirm Submission",
    dialogBody = "",
}) => {
    return (
        <Dialog open={dialogOpen} onClose={closeDialog}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogBody}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button onClick={() => {
                    onSubmit();
                    closeDialog();
                }}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );

}

export default PostSubmitDialog;