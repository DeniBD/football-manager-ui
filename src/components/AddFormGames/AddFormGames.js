import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button, createTheme, ThemeProvider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './AddFormGames.css';

function AddFormGames({ open, onClose, handleFormSubmit }) {
    const [teamOne, setTeamOne] = useState('');
    const [teamTwo, setTeamTwo] = useState('');
    const [startHour, setStartHour] = useState('');
    const [date, setDate] = useState('');
    const [goalsTeamOne, setGoalsTeamOne] = useState('');
    const [goalsTeamTwo, setGoalsTeamTwo] = useState('');
    const [stadium, setStadium] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newGame = {
            teamOne,
            teamTwo,
            startHour,
            date,
            result: {
                goalsTeamOne: parseInt(goalsTeamOne),
                goalsTeamTwo: parseInt(goalsTeamTwo),
            },
            stadium,
        };
        handleFormSubmit(newGame);
        // Reset form fields
        setTeamOne('');
        setTeamTwo('');
        setStartHour('');
        setDate('');
        setGoalsTeamOne('');
        setGoalsTeamTwo('');
        setStadium('');
    };

    const handleClose = () => {
        // Reset form fields
        setTeamOne('');
        setTeamTwo('');
        setStartHour('');
        setDate('');
        setGoalsTeamOne('');
        setGoalsTeamTwo('');
        setStadium('');
        onClose();
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        color: 'inherit',
                    },
                },
            },
        },
    });

    return (
        <Modal open={open} onClose={handleClose} className="dark-modal">
            <Box className="modal-box">
                <IconButton className="close-button" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <ThemeProvider theme={darkTheme}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Add Game
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ mt: 2, mb: 3 }}
                            label="Team 1"
                            name="teamOne"
                            fullWidth
                            className="form-field"
                            value={teamOne}
                            onChange={(e) => setTeamOne(e.target.value)}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            label="Team 2"
                            name="teamTwo"
                            fullWidth
                            className="form-field"
                            value={teamTwo}
                            onChange={(e) => setTeamTwo(e.target.value)}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            label="Start Hour"
                            name="startHour"
                            fullWidth
                            className="form-field"
                            value={startHour}
                            onChange={(e) => setStartHour(e.target.value)}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            label="Date"
                            name="date"
                            fullWidth
                            className="form-field"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            label="Goals Team 1"
                            name="goalsTeamOne"
                            fullWidth
                            className="form-field"
                            value={goalsTeamOne}
                            onChange={(e) => setGoalsTeamOne(e.target.value)}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            label="Goals Team 2"
                            name="goalsTeamTwo"
                            fullWidth
                            className="form-field"
                            value={goalsTeamTwo}
                            onChange={(e) => setGoalsTeamTwo(e.target.value)}
                        />
                        <TextField
                            sx={{ mb: 4 }}
                            label="Stadium"
                            name="stadium"
                            fullWidth
                            className="form-field"
                            value={stadium}
                            onChange={(e) => setStadium(e.target.value)}
                        />
                        <Button sx={{ mb: 0.5 }} type="submit" variant="contained" fullWidth className="add-button">
                            Add
                        </Button>
                    </form>
                </ThemeProvider>
            </Box>
        </Modal>
    );
}

export default AddFormGames;
