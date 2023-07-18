// EditFormPlayers.js
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './EditFormPlayers.css';

function EditFormPlayers({ open, onClose, handleFormSubmit, playerData }) {
    const [selectedRole, setSelectedRole] = useState('');
    const [name, setName] = useState('');
    const [goalsScored, setGoalsScored] = useState('');
    const [team, setTeam] = useState('');
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8090/teams')
            .then((response) => response.json())
            .then((json) => {
                setTeamData(json);
            })
            .catch((error) => {
                console.error('An error occurred while fetching teams:', error);
            });
    }, []);

    useEffect(() => {
        if (playerData) {
            setSelectedRole(playerData.role);
            setName(playerData.name);
            setGoalsScored(playerData.goalsScored);
            setTeam(playerData.team.name);
        }
    }, [playerData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const teamName = team;

        try {
            const teamResponse = await fetch(`http://localhost:8090/teams/name/${teamName}`);

            if (!teamResponse.ok) {
                throw new Error('Failed to find the team');
            }

            const teamData = await teamResponse.json();
            console.log(teamData);
            const editedPlayer = {
                id: playerData.id,
                name: name,
                goalsScored: parseInt(goalsScored),
                role: selectedRole,
                team: {
                    id: teamData.id,
                    name: teamData.name,
                    goalsScored: teamData.goalsScored,
                    goalsReceived: teamData.goalsReceived,
                    victories: teamData.victories,
                    defeats: teamData.defeats,
                    draws: teamData.draws,
                },
            };

            const playerResponse = await fetch(`http://localhost:8090/players/${playerData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedPlayer),
            });

            if (!playerResponse.ok) {
                throw new Error('Failed to save the player');
            }

            setName('');
            setGoalsScored('');
            setSelectedRole('');
            setTeam('');
            onClose();
            console.log('Player saved successfully');
            handleFormSubmit(editedPlayer);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClose = () => {
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
                    Edit Player
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        sx={{ mt: 2, mb: 3 }}
                        name="name"
                        fullWidth
                        label="Name"
                        className="form-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        sx={{ mb: 3 }}
                        name="goalsScored"
                        fullWidth
                        label="Goals Scored"
                        className="form-field"
                        value={goalsScored}
                        onChange={(e) => setGoalsScored(e.target.value)}
                    />
                    <FormControl sx={{ mb: 3 }} fullWidth className="form-field">
                        <InputLabel>Role</InputLabel>
                        <Select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} name="role">
                            <MenuItem value="DEFENDER">DEFENDER</MenuItem>
                            <MenuItem value="FORWARD">FORWARD</MenuItem>
                            <MenuItem value="GOALKEEPER">GOALKEEPER</MenuItem>
                            <MenuItem value="MIDFIELDER">MIDFIELDER</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl  sx={{ mb: 5 }}fullWidth>
                        <InputLabel>Team</InputLabel>
                        <Select value={team} onChange={(event) => setTeam(event.target.value)} name="team">
                            {teamData.map((team) => (
                                <MenuItem sx={{ mb: 4 }} fullWidth className="form-field" style={{ maxHeight: '10px',  }} key={team.id} value={team.name}>
                                    {team.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button sx={{ mb: 0.5 }} type="submit" variant="contained" fullWidth className="edit-button">
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default EditFormPlayers;
