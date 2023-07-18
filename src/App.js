import React from 'react';
import {Routes, Route, Router} from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layout/Navbar';
import PlayersPage from './pages/PlayersPage';
import GamesPage from './pages/GamesPage';
import TeamsPage from "./pages/TeamsPage";
import HomePage from "./pages/HomePage.js"
import StadiumsPage from "./pages/StadiumsPage.js"

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                {/*<Route path="/teams" element={<TeamsPage />} />*/}
                <Route path="/players" element={<PlayersPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/stadiums" element={<StadiumsPage />} />
            </Routes>
        </div>
    );
}

export default App;
