import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, IconButton, TextField } from '@mui/material';
import PlayersTable from '../components/PlayersTable/PlayersTable.js';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddFormPlayers from '../components/AddFormPlayers/AddFormPlayers.js';
import EditFormPlayers from '../components/EditFormPlayers/EditFormPlayers.js';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function PlayersPage() {
    const [sortBy, setSortBy] = useState('');
    const [playerData, setPlayerData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:8090/players')
            .then((response) => response.json())
            .then((json) => {
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
        setShowAddForm(true);
    };

    const handleFormSubmit = (newPlayer) => {
        fetch('http://localhost:8090/players')
            .then((response) => response.json())
            .then((json) => {
                setPlayerData(json);
            })
            .catch((error) => {
                console.error('An error occurred while fetching updated players:', error);
            });
    };

    const handlePlayerDelete = (id) => {
        fetch(`http://localhost:8090/players/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(`Successfully deleted player with id ${id}`);
                    fetch('http://localhost:8090/players')
                        .then((response) => response.json())
                        .then((json) => {
                            setPlayerData(json);
                        })
                        .catch((error) => {
                            console.error('An error occurred while fetching updated players:', error);
                        });
                } else {
                    console.error(`Failed to delete player with id ${id}`);
                }
            })
            .catch((error) => {
                console.error(`An error occurred while deleting player with id ${id}:`, error);
            });
    };

    const handleCloseAddForm = () => {
        setShowAddForm(false);
    };

    const handleEditPlayer = (player) => {
        setSelectedPlayer(player);
        setShowEditForm(true);
    };

    const handleCloseEditForm = () => {
        setSelectedPlayer(null);
        setShowEditForm(false);
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query === '') {
            fetch('http://localhost:8090/players')
                .then((response) => response.json())
                .then((json) => {
                    setPlayerData(json);
                })
                .catch((error) => {
                    console.error('An error occurred while fetching players:', error);
                });
        }
    };

    useEffect(() => {
        const filteredPlayers = playerData.filter((player) =>
            player.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPlayerData(filteredPlayers);
    }, [searchQuery]);

    return (
        <div style={{ backgroundColor: '#f0f0f0', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '18px' }}>Players</h1>
                {!showAddForm && (
                    <IconButton onClick={handleAddPlayer}>
                        <AddCircleIcon
                            sx={{
                                color: 'green',
                                fontSize: '40px',
                                transition: 'color 0.3s',
                                '&:hover': {
                                    color: 'darkgreen',
                                },
                            }}
                        />
                    </IconButton>
                )}
            </div>
            <TextField
                sx={{marginTop: "15px"}}
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
            />
            <ThemeProvider theme={darkTheme}>
                <PlayersTable
                    playerData={playerData}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    handlePlayerDelete={handlePlayerDelete}
                    handleEditPlayer={handleEditPlayer}
                />
            </ThemeProvider>
            {showEditForm && selectedPlayer && (
                <EditFormPlayers
                    open={showEditForm}
                    onClose={handleCloseEditForm}
                    playerData={selectedPlayer}
                    handleFormSubmit={handleFormSubmit}
                />
            )}
            {showAddForm && !selectedPlayer && (
                <AddFormPlayers open={showAddForm} onClose={handleCloseAddForm} handleFormSubmit={handleFormSubmit} />
            )}
        </div>
    );
}

export default PlayersPage;
