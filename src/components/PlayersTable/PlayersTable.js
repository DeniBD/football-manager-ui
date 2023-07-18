import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './PlayersTable.css';

const PlayersTable = ({ playerData, sortBy, sortOrder, handleSort, handlePlayerDelete, handleEditPlayer }) => {
    return (
        <TableContainer component={Paper} sx={{ width: '90%', margin: '30px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ textAlign: 'center' }} align="center">Name</TableCell>
                        <TableCell sx={{ textAlign: 'center' }} align="center">Goals Scored</TableCell>
                        <TableCell sx={{ textAlign: 'center' }} align="center">Role</TableCell>
                        <TableCell sx={{ textAlign: 'center' }} align="center">Team</TableCell>
                        <TableCell sx={{ textAlign: 'center' }} align="center">Actions</TableCell>
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
                                    onClick={() => handleEditPlayer(player)}
                                />
                                <DeleteIcon
                                    sx={{
                                        color: 'red',
                                        marginLeft: '10px',
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
    );
};

export default PlayersTable;
