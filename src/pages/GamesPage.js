import React, { useEffect, useState } from 'react';
import { createTheme, IconButton, ThemeProvider } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GamesTable from '../components/GamesTable/GamesTable.js';
import AddFormGames from "../components/AddFormGames/AddFormGames.js";

function GamesPage() {
    const [gameData, setGameData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8090/games')
            .then(response => response.json())
            .then(json => {
                setGameData(json);
            });
    }, []);

    const handleFormSubmit = (newGame) => {
        fetch('http://localhost:8090/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGame),
        })
            .then(response => {
                if (response.ok) {
                    console.log('Successfully added new game');
                    fetch('http://localhost:8090/games')
                        .then(response => response.json())
                        .then(json => {
                            setGameData(json);
                            setShowForm(false);
                        })
                        .catch(error => {
                            console.error('An error occurred while fetching updated games:', error);
                        });
                } else {
                    console.error('Failed to add new game');
                }
            })
            .catch(error => {
                console.error('An error occurred while adding new game:', error);
            });
    };

    const handlePlayerDelete = (id) => {
        fetch(`http://localhost:8090/games/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Successfully deleted game with id ${id}`);
                    fetch("http://localhost:8090/games")
                        .then(response => response.json())
                        .then(json => {
                            setGameData(json);
                        })
                        .catch(error => {
                            console.error("An error occurred while fetching updated games:", error);
                        });
                } else {
                    console.error(`Failed to delete game with id ${id}`);
                }
            })
            .catch(error => {
                console.error(`An error occurred while deleting game with id ${id}:`, error);
            });
    };

    const handleAddGame = () => {
        setShowForm(true);
    };

    const handleCloseAddGameModal = () => {
        setShowForm(false);
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <div style={{ backgroundColor: '#f0f0f0', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '18px' }}>Games</h1>
                {!showForm && (
                    <IconButton onClick={handleAddGame}>
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
                <GamesTable gameData={gameData} handlePlayerDelete={handlePlayerDelete} />
                <AddFormGames open={showForm} onClose={handleCloseAddGameModal} handleFormSubmit={handleFormSubmit} />
            </ThemeProvider>
        </div>
    );
}

export default GamesPage;
