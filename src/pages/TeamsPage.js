import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableSortLabel from '@mui/material/TableSortLabel';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// const teamData = [
//     {
//         "id": 1,
//         "name": "Team A",
//         "goalsScored": 3,
//         "goalsReceived": 14,
//         "victories": 7,
//         "defeats": 7,
//         "draws": 9
//     },
//     {
//         "id": 2,
//         "name": "Team B",
//         "goalsScored": 18,
//         "goalsReceived": 6,
//         "victories": 8,
//         "defeats": 7,
//         "draws": 3
//     },
//     {
//         "id": 3,
//         "name": "Team C",
//         "goalsScored": 6,
//         "goalsReceived": 3,
//         "victories": 1,
//         "defeats": 1,
//         "draws": 4
//     },
//     {
//         "id": 4,
//         "name": "Team D",
//         "goalsScored": 5,
//         "goalsReceived": 5,
//         "victories": 7,
//         "defeats": 1,
//         "draws": 6
//     },
//     {
//         "id": 5,
//         "name": "Team E",
//         "goalsScored": 3,
//         "goalsReceived": 11,
//         "victories": 6,
//         "defeats": 9,
//         "draws": 4
//     },
//     {
//         "id": 6,
//         "name": "Team F",
//         "goalsScored": 0,
//         "goalsReceived": 12,
//         "victories": 4,
//         "defeats": 6,
//         "draws": 7
//     },
//     {
//         "id": 7,
//         "name": "Team G",
//         "goalsScored": 7,
//         "goalsReceived": 6,
//         "victories": 2,
//         "defeats": 5,
//         "draws": 2
//     },
//     {
//         "id": 8,
//         "name": "Team H",
//         "goalsScored": 15,
//         "goalsReceived": 4,
//         "victories": 9,
//         "defeats": 1,
//         "draws": 7
//     },
//     {
//         "id": 9,
//         "name": "Team I",
//         "goalsScored": 12,
//         "goalsReceived": 12,
//         "victories": 9,
//         "defeats": 0,
//         "draws": 1
//     },
//     {
//         "id": 10,
//         "name": "Team J",
//         "goalsScored": 8,
//         "goalsReceived": 2,
//         "victories": 4,
//         "defeats": 7,
//         "draws": 6
//     },
//     {
//         "id": 11,
//         "name": "Team K",
//         "goalsScored": 7,
//         "goalsReceived": 10,
//         "victories": 5,
//         "defeats": 1,
//         "draws": 9
//     },
//     {
//         "id": 12,
//         "name": "Team L",
//         "goalsScored": 19,
//         "goalsReceived": 5,
//         "victories": 4,
//         "defeats": 9,
//         "draws": 3
//     },
//     {
//         "id": 13,
//         "name": "Team M",
//         "goalsScored": 15,
//         "goalsReceived": 6,
//         "victories": 3,
//         "defeats": 3,
//         "draws": 4
//     },
//     {
//         "id": 14,
//         "name": "Team N",
//         "goalsScored": 1,
//         "goalsReceived": 1,
//         "victories": 7,
//         "defeats": 5,
//         "draws": 5
//     },
//     {
//         "id": 15,
//         "name": "Team O",
//         "goalsScored": 7,
//         "goalsReceived": 1,
//         "victories": 2,
//         "defeats": 2,
//         "draws": 5
//     },
//     {
//         "id": 16,
//         "name": "Team P",
//         "goalsScored": 11,
//         "goalsReceived": 9,
//         "victories": 1,
//         "defeats": 0,
//         "draws": 8
//     },
//     {
//         "id": 17,
//         "name": "Team Q",
//         "goalsScored": 10,
//         "goalsReceived": 4,
//         "victories": 2,
//         "defeats": 9,
//         "draws": 5
//     },
//     {
//         "id": 18,
//         "name": "Team R",
//         "goalsScored": 6,
//         "goalsReceived": 11,
//         "victories": 9,
//         "defeats": 5,
//         "draws": 0
//     },
//     {
//         "id": 19,
//         "name": "Team S",
//         "goalsScored": 6,
//         "goalsReceived": 4,
//         "victories": 4,
//         "defeats": 3,
//         "draws": 2
//     },
//     {
//         "id": 20,
//         "name": "Team T",
//         "goalsScored": 9,
//         "goalsReceived": 10,
//         "victories": 7,
//         "defeats": 0,
//         "draws": 4
//     }
// ];

const playerData = [
    {
        "id": 1,
        "name": "Player 1",
        "goalsScored": 10,
        "role": "Forward",
        "team": {
            "id": 1,
            "name": "Team A"
        }
    },
    {
        "id": 2,
        "name": "Player 2",
        "goalsScored": 5,
        "role": "Midfielder",
        "team": {
            "id": 2,
            "name": "Team B"
        }
    },
    {
        "id": 3,
        "name": "Player 3",
        "goalsScored": 3,
        "role": "Defender",
        "team": {
            "id": 1,
            "name": "Team A"
        }
    },
    {
        "id": 4,
        "name": "Player 4",
        "goalsScored": 7,
        "role": "Forward",
        "team": {
            "id": 3,
            "name": "Team C"
        }
    },
    {
        "id": 5,
        "name": "Player 5",
        "goalsScored": 2,
        "role": "Midfielder",
        "team": {
            "id": 2,
            "name": "Team B"
        }
    },
    {
        "id": 6,
        "name": "Player 6",
        "goalsScored": 1,
        "role": "Defender",
        "team": {
            "id": 1,
            "name": "Team A"
        }
    },
    {
        "id": 7,
        "name": "Player 7",
        "goalsScored": 4,
        "role": "Forward",
        "team": {
            "id": 3,
            "name": "Team C"
        }
    },
    {
        "id": 8,
        "name": "Player 8",
        "goalsScored": 6,
        "role": "Midfielder",
        "team": {
            "id": 2,
            "name": "Team B"
        }
    },
    {
        "id": 9,
        "name": "Player 9",
        "goalsScored": 0,
        "role": "Defender",
        "team": {
            "id": 1,
            "name": "Team A"
        }
    },
    {
        "id": 10,
        "name": "Player 10",
        "goalsScored": 8,
        "role": "Forward",
        "team": {
            "id": 3,
            "name": "Team C"
        }
    },
    {
        "id": 11,
        "name": "Player 11",
        "goalsScored": 3,
        "role": "Midfielder",
        "team": {
            "id": 2,
            "name": "Team B"
        }
    },
    {
        "id": 12,
        "name": "Player 12",
        "goalsScored": 2,
        "role": "Defender",
        "team": {
            "id": 1,
            "name": "Team A"
        }
    },
    {
        "id": 13,
        "name": "Player 13",
        "goalsScored": 5,
        "role": "Forward",
        "team": {
            "id": 3,
            "name": "Team C"
        }
    },
    {
        "id": 14,
        "name": "Player 14",
        "goalsScored": 1,
        "role": "Midfielder",
        "team": {
            "id": 2,
            "name": "Team B"
        }
    },
    {
        "id": 15,
        "name": "Player 15",
        "goalsScored": 3,
        "role": "Defender",
        "team": {
            "id": 1,
            "name": "Team A"
        }
    },
    {
        "id": 16,
        "name": "Player 16",
        "goalsScored": 9,
        "role": "Forward",
        "team": {
            "id": 3,
            "name": "Team C"
        }
    },
    {
        "id": 17,
        "name": "Player 17",
        "goalsScored": 4,
        "role": "Midfielder",
        "team": {
            "id": 2,
            "name": "Team B"
        }
    },
    {
        "id": 18,
        "name": "Player 18",
        "goalsScored": 1,
        "role": "Defender",
        "team": {
            "id": 1,
            "name": "Team A"
        }
    },
    {
        "id": 19,
        "name": "Player 19",
        "goalsScored": 7,
        "role": "Forward",
        "team": {
            "id": 3,
            "name": "Team C"
        }
    },
    {
        "id": 20,
        "name": "Player 20",
        "goalsScored": 2,
        "role": "Midfielder",
        "team": {
            "id": 2,
            "name": "Team B"
        }
    }
];




function TeamsPage() {
    const [sortBy, setSortBy] = useState('');
    const [teamData,setTeamData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(()=>{
        fetch('http://localhost:8090/teams')
            .then(response => response.json())
            .then(json =>{
                console.log(json);
                setTeamData(json);
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

    const sortedData = teamData.sort((a, b) => {
        if (sortBy === 'name') {
            return sortOrder === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else {
            return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
        }
    });

    const Row = ({ team }) => {
        const [open, setOpen] = useState(false);

        return (
            <React.Fragment>
                <TableRow>
                    {/*<TableCell>*/}
                    {/*    <IconButton*/}
                    {/*        aria-label="expand row"*/}
                    {/*        size="small"*/}
                    {/*        onClick={() => setOpen(!open)}*/}
                    {/*    >*/}
                    {/*        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}*/}
                    {/*    </IconButton>*/}
                    {/*</TableCell>*/}
                    <TableCell align="center">{team.name}</TableCell>
                    <TableCell align="center">{team.goalsScored}</TableCell>
                    <TableCell align="center">{team.goalsReceived}</TableCell>
                    <TableCell align="center">{team.victories}</TableCell>
                    <TableCell align="center">{team.defeats}</TableCell>
                    <TableCell align="center">{team.draws}</TableCell>
                    <TableCell align="center">
                        <Button variant="contained" color="primary" style={{ marginRight: '8px' }}>
                            Edit
                        </Button>
                        <Button variant="contained" color="secondary" style={{ backgroundColor: '#A51205' }}>
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        {/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
                        {/*    <Box sx={{ margin: 1 }}>*/}
                        {/*        <Typography variant="h6" gutterBottom component="div" align="center">*/}
                        {/*            Players*/}
                        {/*        </Typography>*/}
                        {/*        <Table size="small">*/}
                        {/*            <TableHead>*/}
                        {/*                <TableRow>*/}
                        {/*                    <TableCell align="center">Name</TableCell>*/}
                        {/*                    <TableCell align="center">Goals Scored</TableCell>*/}
                        {/*                    <TableCell align="center">Role</TableCell>*/}
                        {/*                    <TableCell align="center">Actions</TableCell>*/}
                        {/*                </TableRow>*/}
                        {/*            </TableHead>*/}
                        {/*            <TableBody>*/}
                        {/*                {playerData.map((player) => (*/}
                        {/*                    player.team.id === team.id && (*/}
                        {/*                        <TableRow key={player.id}>*/}
                        {/*                            <TableCell align="center">{player.name}</TableCell>*/}
                        {/*                            <TableCell align="center">{player.goalsScored}</TableCell>*/}
                        {/*                            <TableCell align="center">{player.role}</TableCell>*/}
                        {/*                            <TableCell align="center">*/}
                        {/*                                <Button variant="contained" color="primary" style={{ marginRight: '8px' }}>*/}
                        {/*                                    Edit*/}
                        {/*                                </Button>*/}
                        {/*                                <Button variant="contained" color="secondary" style={{ backgroundColor: '#A51205' }}>*/}
                        {/*                                    Delete*/}
                        {/*                                </Button>*/}
                        {/*                            </TableCell>*/}
                        {/*                        </TableRow>*/}
                        {/*                    )*/}
                        {/*                ))}*/}
                        {/*            </TableBody>*/}
                        {/*        </Table>*/}
                        {/*    </Box>*/}
                        {/*</Collapse>*/}
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    };

    return (
        <div style={{ marginRight: "20px", marginLeft: "20px", paddingTop: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <h1>Teams Page</h1>
            <Button variant="contained" color="primary" style={{ margin: '8px' }}>
                Create Team
            </Button>
            <TableContainer component={Paper} sx={{ margin: '30px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
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
                                    active={sortBy === 'goalsReceived'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('goalsReceived')}
                                >
                                    Goals Received
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={sortBy === 'victories'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('victories')}
                                >
                                    Victories
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={sortBy === 'defeats'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('defeats')}
                                >
                                    Defeats
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={sortBy === 'draws'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('draws')}
                                >
                                    Draws
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((team) => (
                            <Row key={team.id} team={team} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TeamsPage;