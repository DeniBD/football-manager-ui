import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, IconButton } from '@mui/material';
import StadiumsTable from '../components/StadiumsTable/StadiumsTable.js';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddFormStadiums from "../components/AddFormStadium/AddFormStadium.js";
import EditFormStadiums from "../components/EditFormStadium/EditFormStadium.js";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function StadiumsPage() {
    const [stadiumData, setStadiumData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedStadium, setSelectedStadium] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8090/stadiums')
            .then((response) => response.json())
            .then((json) => {
                setStadiumData(json);
            });
    }, []);

    const handleAddStadium = () => {
        setShowAddForm(true);
    };

    const handleEditStadium = (stadium) => {
        setSelectedStadium(stadium);
        setShowEditForm(true);
    };

    const handleFormSubmit = (newStadium) => {
        fetch('http://localhost:8090/stadiums')
            .then((response) => response.json())
            .then((json) => {
                setStadiumData(json);
            })
            .catch((error) => {
                console.error('An error occurred while fetching updated stadiums:', error);
            });
    };

    const handleCloseAddForm = () => {
        setShowAddForm(false);
    };

    const handleCloseEditForm = () => {
        setSelectedStadium(null);
        setShowEditForm(false);
    };

    const handleUpdateStadium = (updatedStadium) => {
        const updatedData = stadiumData.map((stadium) =>
            stadium.id === updatedStadium.id ? updatedStadium : stadium
        );
        setStadiumData(updatedData);
    };

    const handleDeleteStadium = (id) => {
        fetch(`http://localhost:8090/stadiums/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(`Successfully deleted stadium with id ${id}`);
                    const updatedData = stadiumData.filter((stadium) => stadium.id !== id);
                    setStadiumData(updatedData);
                } else {
                    console.error(`Failed to delete stadium with id ${id}`);
                }
            })
            .catch((error) => {
                console.error(`An error occurred while deleting stadium with id ${id}:`, error);
            });
    };

    return (
        <div style={{ backgroundColor: '#f0f0f0', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '18px' }}>Stadiums</h1>
                {!showAddForm && (
                    <IconButton onClick={handleAddStadium}>
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
            <ThemeProvider theme={darkTheme}>
                <StadiumsTable
                    stadiumData={stadiumData}
                    handleEditStadium={handleEditStadium}
                    handleDeleteStadium={handleDeleteStadium}
                />
            </ThemeProvider>
            {showEditForm && selectedStadium && (
                <EditFormStadiums
                    open={showEditForm}
                    onClose={handleCloseEditForm}
                    handleFormSubmit={handleUpdateStadium}
                    stadiumData={selectedStadium}
                />
            )}
            {showAddForm && (
                <AddFormStadiums open={showAddForm} onClose={handleCloseAddForm} handleFormSubmit={handleFormSubmit} />
            )}
        </div>
    );
}

export default StadiumsPage;
