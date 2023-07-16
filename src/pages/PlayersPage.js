import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Modal, Box, Typography, Button, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TableSortLabel from "@mui/material/TableSortLabel";
import CloseIcon from '@mui/icons-material/Close';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function PlayersPage() {
    const [sortBy, setSortBy] = useState('');
    const [playerData, setPlayerData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [showForm, setShowForm] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

    const handlePlayerDelete = (id) => {
        fetch(`http://localhost:8090/players/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Successfully deleted player with id ${id}`);
                    fetch("http://localhost:8090/players")
                        .then(response => response.json())
                        .then(json => {
                            setPlayerData(json);
                        })
                        .catch(error => {
                            console.error("An error occurred while fetching updated players:", error);
                        });
                } else {
                    console.error(`Failed to delete player with id ${id}`);
                }
            })
            .catch(error => {
                console.error(`An error occurred while deleting player with id ${id}:`, error);
            });
    };

    useEffect(() => {
        fetch('http://localhost:8090/players')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                setPlayerData(json);
            });
    }, []);

    const handleSort = (column) => {
        if (column === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const handleAddPlayer = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const newPlayer = {
            name: formData.get('name'),
            goalsScored: parseInt(formData.get('goalsScored')),
            role: formData.get('role'),
            team: formData.get('team')
        };

        fetch('http://localhost:8090/players', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPlayer)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Successfully added new player");
                    fetch("http://localhost:8090/players")
                        .then(response => response.json())
                        .then(json => {
                            setPlayerData(json);
                        })
                        .catch(error => {
                            console.error("An error occurred while fetching updated players:", error);
                        });
                    setShowForm(false);
                } else {
                    console.error("Failed to add new player");
                }
            })
            .catch(error => {
                console.error("An error occurred while adding new player:", error);
            });
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div style={{ backgroundColor: '#f0f0f0', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '18px' }}>Players</h1>
                {!showForm && (
                    <AddCircleIcon
                        sx={{
                            color: 'green',
                            fontSize: '40px',
                            transition: 'color 0.3s',
                            '&:hover': {
                                color: 'darkgreen',
                            }
                        }}
                        onClick={handleAddPlayer}
                    />
                )}
            </div>
            <ThemeProvider theme={darkTheme}>
                <TableContainer component={Paper} sx={{ width: '90%', margin: '30px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active={sortBy === 'name'}
                                        direction={sortOrder}
                                        onClick={() => handleSort('name')}
                                    >
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active={sortBy === 'goalsScored'}
                                        direction={sortOrder}
                                        onClick={() => handleSort('goalsScored')}
                                    >
                                        Goals Scored
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active={sortBy === 'role'}
                                        direction={sortOrder}
                                        onClick={() => handleSort('role')}
                                    >
                                        Role
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active={sortBy === 'team.name'}
                                        direction={sortOrder}
                                        onClick={() => handleSort('team.name')}
                                        >
                                        Team
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center" >Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {playerData.map((player, index) => (
                                <TableRow key={player.id} sx={{ backgroundColor: index % 2 === 0 ? '#303030' : '#424242' }}>
                                    <TableCell align="center">{player.name}</TableCell>
                                    <TableCell align="center">{player.goalsScored}</TableCell>
                                    <TableCell align="center">{player.role}</TableCell>
                                    <TableCell align="center">{player.team.name}</TableCell>
                                    <TableCell align="center">
                                        <EditIcon
                                            sx={{
                                                color: 'cornflowerblue',
                                                marginRight: '35px',
                                                transition: 'color 0.3s',
                                                '&:hover': {
                                                    color: 'white',
                                                },
                                            }}
                                        />
                                        <DeleteIcon
                                            sx={{
                                                color: 'red',
                                                marginLeft: "10px",
                                                transition: 'color 0.3s',
                                                '&:hover': {
                                                    color: 'white',
                                                },
                                            }}
                                            onClick={() => handlePlayerDelete(player.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>

            <Modal open={showForm} onClose={handleCloseForm}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                        textAlign: 'center',
                    }}
                >
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            color: 'gray',
                        }}
                        onClick={handleCloseForm}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Add Player
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <TextField label="Name" name="name" fullWidth sx={{ mb: 2 }} />
                        <TextField label="Goals Scored" name="goalsScored" fullWidth sx={{ mb: 2 }} />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Role</InputLabel>
                            <Select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} name="role">
                                <MenuItem value="DEFENDER">DEFENDER</MenuItem>
                                <MenuItem value="FORWARD">FORWARD</MenuItem>
                                <MenuItem value="GOALKEEPER">GOALKEEPER</MenuItem>
                                <MenuItem value="MIDFIELDER">MIDFIELDER</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Team" name="team" fullWidth sx={{ mb: 2 }} />
                        <Button type="submit" variant="contained" sx={{ width: '100%', mt: 2 }}>
                            Add
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default PlayersPage;
