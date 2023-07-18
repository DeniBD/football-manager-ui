import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './EditFormStadium.css';

function EditFormStadiums({ open, onClose, handleFormSubmit, stadiumData }) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        if (stadiumData) {
            setName(stadiumData.name);
            setLocation(stadiumData.location);
        }
    }, [stadiumData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const editedStadium = {
                id: stadiumData.id,
                name: name,
                location: location,
            };

            const stadiumResponse = await fetch(`http://localhost:8090/stadiums/${stadiumData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedStadium),
            });

            if (!stadiumResponse.ok) {
                throw new Error('Failed to save the stadium');
            }

            setName('');
            setLocation('');
            onClose();
            console.log('Stadium saved successfully');
            handleFormSubmit(editedStadium);
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
                    Edit Stadium
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        sx={{ mt: 2, mb: 3 }}
                        fullWidth
                        label="Name"
                        className="form-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        sx={{ mb: 4 }}
                        fullWidth
                        label="Location"
                        className="form-field"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <Button sx={{ mb: 0.5 }} type="submit" variant="contained" fullWidth className="edit-button">
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default EditFormStadiums;
