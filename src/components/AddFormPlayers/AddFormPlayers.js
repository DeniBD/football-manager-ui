import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './AddFormPlayers.css';

function AddFormPlayers({ open, onClose, handleFormSubmit }) {
    const [selectedRole, setSelectedRole] = useState('');
    const [name, setName] = useState('');
    const [goalsScored, setGoalsScored] = useState('');
    const [team, setTeam] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPlayer = {
            name,
            goalsScored: parseInt(goalsScored),
            role: selectedRole,
            team
        };
        handleFormSubmit(newPlayer);
        // Reset form fields
        setName('');
        setGoalsScored('');
        setSelectedRole('');
        setTeam('');
    };

    const handleClose = () => {
        // Reset form fields
        setName('');
        setGoalsScored('');
        setSelectedRole('');
        setTeam('');
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose} className="dark-modal">
            <Box className="modal-box">
                <IconButton className="close-button" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" gutterBottom>
                    Add Player
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField sx={{ mt: 2, mb: 3 }} label="Name" name="name" fullWidth className="form-field" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField sx={{ mb: 3 }} label="Goals Scored" name="goalsScored" fullWidth className="form-field" value={goalsScored} onChange={(e) => setGoalsScored(e.target.value)} />
                    <FormControl sx={{ mb: 3 }} fullWidth className="form-field">
                        <InputLabel>Role</InputLabel>
                        <Select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} name="role">
                            <MenuItem value="DEFENDER">DEFENDER</MenuItem>
                            <MenuItem value="FORWARD">FORWARD</MenuItem>
                            <MenuItem value="GOALKEEPER">GOALKEEPER</MenuItem>
                            <MenuItem value="MIDFIELDER">MIDFIELDER</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField sx={{ mb: 4 }} label="Team" name="team" fullWidth className="form-field" value={team} onChange={(e) => setTeam(e.target.value)} />
                    <Button sx={{ mb: 0.5 }} type="submit" variant="contained" fullWidth className="add-button">
                        Add
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default AddFormPlayers;
