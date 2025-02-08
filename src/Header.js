import React from 'react';
import logo from './assets/logo.png'; // Make sure to have a logo image in the src folder

const Header = () => {
    return (
        <header className="bg-[#B1FF9C] p-4 shadow">
            <div className="container mx-auto flex items-center justify-center sm:justify-start">
                <img src={logo} alt="Logo" className="h-10 mr-4" />
            </div>
        </header>
    );
};

export default Header;