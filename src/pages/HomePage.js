import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import stadiumImage from '../stadion.jpg'; // Import the image using import
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import GroupsIcon from '@mui/icons-material/Groups';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMadeIcon from '@mui/icons-material/CallMade';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BalanceIcon from '@mui/icons-material/Balance';
import DangerousIcon from '@mui/icons-material/Dangerous';

function HomePage() {
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8090/teams')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                setTeamData(json);
            });
    }, []);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${stadiumImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                overflow: 'auto',
            }}>
                <ThemeProvider theme={darkTheme}>
                    <TableContainer component={Paper} sx={{ width: '80%', marginTop: '600px', marginBottom: '100px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        #
                                    </TableCell>
                                    <TableCell align="center">
                                        Name
                                        <GroupsIcon style={{marginLeft: "10px"}}/>
                                    </TableCell>
                                    <TableCell align="center">
                                        Goals Scored
                                        <CallMadeIcon style={{marginLeft: "10px", color: "green"}}/>
                                    </TableCell>
                                    <TableCell align="center">
                                        Goals Received
                                        <CallReceivedIcon style={{marginLeft: "10px", color: "red"}}/>
                                    </TableCell>
                                    <TableCell align="center">
                                        Wins
                                        <EmojiEventsIcon style={{marginLeft: "10px", color: "gold"}}/>
                                    </TableCell>
                                    <TableCell align="center">
                                        Draws
                                        <BalanceIcon style={{marginLeft: "10px", color: "darkorange"}}/>
                                    </TableCell>
                                    <TableCell align="center">
                                        Defeats
                                        <DangerousIcon style={{marginLeft: "10px", color: "red"}}/>
                                    </TableCell>
                                    <TableCell align="center">
                                        Points
                                    <ScoreboardIcon style={{marginLeft: "10px", color: "seagreen"}}/>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teamData.map((team, index) => (
                                    <TableRow key={team.id} sx={{ backgroundColor: index % 2 === 0 ? '#303030' : '#424242'}}>
                                        <TableCell align="center">
                                            {index === 0 ? (
                                                <EmojiEventsIcon
                                                    sx={{
                                                        color: 'gold',
                                                        marginRight: '8px',
                                                        fontSize: '20px',
                                                    }}
                                                />
                                            ) : (
                                                index + 1
                                            )}
                                        </TableCell>
                                        <TableCell align="center">{team.name}</TableCell>
                                        <TableCell align="center">{team.goalsScored}</TableCell>
                                        <TableCell align="center">{team.goalsReceived}</TableCell>
                                        <TableCell align="center">{team.victories}</TableCell>
                                        <TableCell align="center">{team.draws}</TableCell>
                                        <TableCell align="center">{team.defeats}</TableCell>
                                        <TableCell align="center">{team.victories * 3 + team.draws * 1}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ThemeProvider>
            </div>
        </div>
    );
}

export default HomePage;
