import React from 'react';
import './App.css';
import SuperheroManager from './SuperheroManager';
import Header from './Header';

function App() {
    return (
        <div className="App bg-[#E8FFDC] min-h-screen flex flex-col gap-6">
            <Header/>
            <SuperheroManager/>
        </div>
    );
}

export default App;