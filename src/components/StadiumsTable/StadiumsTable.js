import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import './StadiumsTable.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsSoccerTwoToneIcon from '@mui/icons-material/SportsSoccerTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StadiumsTable = ({ stadiumData, handleEditStadium, handleDeleteStadium }) => {
    return (
        <TableContainer component={Paper} sx={{ width: '70%', margin: '30px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ textAlign: 'center', height: '30px' }} align="center">
                            Name
                            <SportsSoccerTwoToneIcon style={{ marginLeft: '7px', color: 'white' }} />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center', height: '30px' }} align="center">
                            Location
                            <LocationOnIcon style={{ marginLeft: '3px', color: 'red' }} />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center', height: '30px' }} align="center">
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stadiumData.map((stadium, index) => (
                        <TableRow key={stadium.id} sx={{ backgroundColor: index % 2 === 0 ? '#303030' : '#424242' }}>
                            <TableCell align="center" sx={{ textAlign: 'center', height: '30px' }}>
                                {stadium.name}
                            </TableCell>
                            <TableCell align="center" sx={{ textAlign: 'center', height: '30px' }}>
                                {stadium.location}
                            </TableCell>
                            <TableCell align="center" sx={{ textAlign: 'center', height: '30px' }}>
                                <IconButton
                                    onClick={() => handleEditStadium(stadium)}
                                    sx={{
                                        color: 'cornflowerblue',
                                        marginRight: '10px',
                                        transition: 'color 0.3s',
                                        '&:hover': {
                                            color: 'white',
                                        },
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => handleDeleteStadium(stadium.id)} // Pass stadium.id as argument
                                    sx={{
                                        color: 'red',
                                        transition: 'color 0.3s',
                                        '&:hover': {
                                            color: 'white',
                                        },
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StadiumsTable;
