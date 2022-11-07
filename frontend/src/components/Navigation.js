import React from 'react';
import Navbar from './Navbar.js';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Bruin_Plate from './Bruin_Plate.js';
import Epicuria from './Epicuria.js';
import De_Neve from './De_Neve.js';
import Main_Menu from './main_menu.js';

function Navigation() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/'  element={<Main_Menu />} />
                <Route path='/Epicuria'  element={<Epicuria />} />
                <Route path='/Bruin_Plate' element={<Bruin_Plate/>} />
                <Route path='/De_Neve' element={<De_Neve/>} />
            </Routes>
        </Router>
    );
}

export default Navigation;