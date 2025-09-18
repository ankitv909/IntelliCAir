import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface ConfirmationDialogProps {
    open: boolean;
    onClose: (confirm: boolean) => void;
    title: string;
    message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({open, onClose, title, message}) => {
    const handleConfirm = () => {
        onClose(true);
    };

    const handleCancel = () => {
        onClose(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogTitle id="confirmation-dialog-title" className={'text-center'}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description" className={'text-center'}>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
