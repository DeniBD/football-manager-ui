import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './AddFormTeam.css';

function AddFormTeam({ open, onClose, handleFormSubmit }) {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newTeam = {
                name: name,
                goalsScored: 0,
                goalsReceived: 0,
                victories: 0,
                draws: 0,
                defeats: 0,
            };

            const response = await fetch('http://localhost:8090/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTeam),
            });

            if (!response.ok) {
                throw new Error('Failed to save the team');
            }

            console.log('Team saved successfully');
            setName('');
            handleFormSubmit(newTeam);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClose = () => {
        setName('');
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose} className="dark-modal">
            <Box className="modal-box">
                <IconButton className="close-button" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" gutterBottom>
                    Add Team
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        sx={{ mt: 2, mb: 3 }}
                        label="Name"
                        name="name"
                        fullWidth
                        className="form-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button sx={{ mb: 0.5 }} type="submit" variant="contained" fullWidth className="add-button">
                        Add
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default AddFormTeam;
