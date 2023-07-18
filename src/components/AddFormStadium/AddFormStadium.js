import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './AddFormStadium.css';

function AddFormStadiums({ open, onClose, handleFormSubmit }) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newStadium = {
                name: name,
                location: location,
            };

            const response = await fetch('http://localhost:8090/stadiums', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStadium),
            });

            if (!response.ok) {
                throw new Error('Failed to save the stadium');
            }

            console.log('Stadium saved successfully');
            setName('');
            setLocation('');
            handleFormSubmit(newStadium);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClose = () => {
        setName('');
        setLocation('');
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose} className="dark-modal">
            <Box className="modal-box">
                <IconButton className="close-button" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" gutterBottom>
                    Add Stadium
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
                    <TextField
                        sx={{ mb: 4 }}
                        label="Location"
                        name="location"
                        fullWidth
                        className="form-field"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <Button sx={{ mb: 0.5 }} type="submit" variant="contained" fullWidth className="add-button">
                        Add
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default AddFormStadiums;
