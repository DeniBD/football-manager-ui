// PlayersPage.js
import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, IconButton } from '@mui/material';
import PlayersTable from '../components/PlayersTable/PlayersTable.js';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddFormPlayers from '../components/AddFormPlayers/AddFormPlayers.js';

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

    useEffect(() => {
        fetch('http://localhost:8090/players')
            .then(response => response.json())
            .then(json => {
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

    const handleFormSubmit = (newPlayer) => {
        fetch('http://localhost:8090/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlayer),
        })
            .then(response => {
                if (response.ok) {
                    console.log('Successfully added new player');
                    fetch('http://localhost:8090/players')
                        .then(response => response.json())
                        .then(json => {
                            setPlayerData(json);
                            setShowForm(false);
                        })
                        .catch(error => {
                            console.error('An error occurred while fetching updated players:', error);
                        });
                } else {
                    console.error('Failed to add new player');
                }
            })
            .catch(error => {
                console.error('An error occurred while adding new player:', error);
            });
    };

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

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div style={{ backgroundColor: '#f0f0f0', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '18px' }}>Players</h1>
                {!showForm && (
                    <IconButton onClick={handleAddPlayer}>
                        <AddCircleIcon sx={{
                            color: 'green',
                            fontSize: '40px',
                            transition: 'color 0.3s',
                            '&:hover': {
                                color: 'darkgreen',
                            }
                        }} />
                    </IconButton>
                )}
            </div>
            <ThemeProvider theme={darkTheme}>
                <PlayersTable
                    playerData={playerData}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    handlePlayerDelete={handlePlayerDelete}
                    //handleEditPlayer={handleEditPlayer}
                />
            </ThemeProvider>
            <AddFormPlayers open={showForm} onClose={handleCloseForm} handleFormSubmit={handleFormSubmit} />
        </div>
    );
}

export default PlayersPage;
