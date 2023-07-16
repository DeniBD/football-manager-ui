import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function GamesPage() {
    const [gameData, setGameData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8090/games')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                setGameData(json);
            });
    }, []);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const handleDelete = (id) => {
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
        // Add your logic for adding a game here
        console.log('Add Game clicked');
    };

    return (
        <div style={{ backgroundColor: '#f0f0f0', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '18px' }}>Games</h1>
                {/*<ControlPointRoundedIcon style={{ fontSize: '32px', color: 'black' }} />*/}
                <AddCircleIcon
                    sx={{
                        color: 'green',
                        fontSize: '40px',
                        transition: 'color 0.3s',
                        '&:hover': {
                            color: 'darkgreen', // Set the hover color for DeleteIcon
                        }
                    }}
                    onClick={handleAddGame}
                />
            </div>
            <ThemeProvider theme={darkTheme}>
                <TableContainer component={Paper} sx={{ width: '90%', margin: '30px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center' }} align="center">Team 1</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} align="center">Team 2</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} align="center">Start Hour</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} align="center">Date</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} align="center">Result</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} align="center">Stadium</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gameData.map((game, index) => (
                                <TableRow key={game.id} sx={{ backgroundColor: index % 2 === 0 ? '#303030' : '#424242' }}>
                                    <TableCell align="center">{game.teamOne.name}</TableCell>
                                    <TableCell align="center">{game.teamTwo.name}</TableCell>
                                    <TableCell align="center">{game.startHour.split(":").slice(0, 2).join(":")}</TableCell>
                                    <TableCell align="center">{game.date.substring(0, 10)}</TableCell>
                                    <TableCell align="center">{game.result.goalsTeamOne}-{game.result.goalsTeamTwo}</TableCell>
                                    <TableCell align="center">{game.stadium.name}</TableCell>
                                    <TableCell align="center">
                                        {game.result.goalsTeamOne === 0 && game.result.goalsTeamTwo === 0 ? (
                                            <PlayCircleIcon
                                                sx={{
                                                    color: 'green',
                                                    marginRight: '35px',
                                                    transition: 'color 0.3s',
                                                    '&:hover': {
                                                        color: 'white',
                                                    },
                                                }}
                                            />
                                        ) : <PlayCircleIcon
                                            sx={{
                                                color: 'rgba(0, 128, 0, 0)', // Transparent green color
                                                marginRight: '35px',
                                            }}
                                        />
                                        }
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
                                                transition: 'color 0.3s',
                                                '&:hover': {
                                                    color: 'white',
                                                },
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>
        </div>
    );
}

export default GamesPage;
