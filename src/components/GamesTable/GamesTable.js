// GamesTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './GamesTable.css';

const GamesTable = ({ gameData, handlePlayerDelete }) => {
    return (
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
                                ) : (
                                    <PlayCircleIcon
                                        sx={{
                                            color: 'rgba(0, 128, 0, 0)', // Transparent green color
                                            marginRight: '35px',
                                        }}
                                    />
                                )}
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
                                    onClick={() => handlePlayerDelete(game.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GamesTable;
