import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import addButton from './assets/add.png';

Modal.setAppElement('#root');

const SuperheroManager = () => {
    const [superheroes, setSuperheroes] = useState([]);
    const [stats, setStats] = useState({});
    const [newSuperhero, setNewSuperhero] = useState({ name: '', superpower: '', humilityScore: '' });
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetchSuperheroes();
        fetchStats();
    }, []);

    const fetchSuperheroes = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/superheroes');
        setSuperheroes(response.data);
    };

    const fetchStats = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/superheroes/stats');
        setStats(response.data);
    };

    const addSuperhero = async () => {
        await axios.post('http://localhost:3000/api/v1/superheroes', newSuperhero);
        fetchSuperheroes();
        setModalIsOpen(false);
    };

    const deleteSuperhero = async (id) => {
        await axios.delete(`http://localhost:3000/api/v1/superheroes/${id}`);
        fetchSuperheroes();
    };

    return (
        <div className="container mx-auto p-4 flex flex-col">
            <div className="flex flex-col gap-2 mb-4">
                <h1 className="text-2xl font-bold">Superhero Manager</h1>
                <p className="text-sm font-semibold">This is a simple app to manage superheroes. You can add, delete, and view superheroes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-[#D1FFB5] flex flex-col justify-center items-center text-black p-4 rounded-xl border-4 border-[#B1FF9C]">
                    <h2 className="text-sm font-semibold">Number of Superheroes</h2>
                    <p className="text-2xl font-semibold my-2">{stats.numberOfSuperheroes}</p>
                </div>
                <div className="bg-[#D1FFB5] flex flex-col justify-center items-center text-black p-4 rounded-xl border-4 border-[#B1FF9C]">
                    <h2 className="text-sm font-semibold">Avg. Humility Score</h2>
                    <p className="text-2xl font-semibold my-2">{stats.avgHumilityScore}</p>
                </div>
                <div className="bg-[#D1FFB5] flex flex-col justify-center items-center text-black p-4 rounded-xl border-4 border-[#B1FF9C]">
                    <h2 className="text-sm font-semibold">Max Humility Score</h2>
                    <p className="text-2xl font-semibold my-2">{stats.maxHumilityScore}</p>
                </div>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="bg-[#D1FFB5] p-4 rounded-xl border-4 border-[#B1FF9C] max-w-md mx-auto mt-20">
                <h2 className="text-xl mb-4">Add New Superhero</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newSuperhero.name}
                    onChange={(e) => setNewSuperhero({ ...newSuperhero, name: e.target.value })}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Superpower"
                    value={newSuperhero.superpower}
                    onChange={(e) => setNewSuperhero({ ...newSuperhero, superpower: e.target.value })}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Humility Score"
                    value={newSuperhero.humilityScore}
                    onChange={(e) => setNewSuperhero({ ...newSuperhero, humilityScore: e.target.value })}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <button onClick={addSuperhero} className="bg-black p-2 rounded-lg w-full mt-4 text-[#D1FFB5]">Add Superhero</button>
                <button onClick={() => setModalIsOpen(false)} className="text-black p-2 rounded-lg border-4 border-black w-full mt-2 font-semibold">Cancel</button>
            </Modal>

            <div className="min-w-full bg-[#D1FFB5] rounded-xl border-4 border-[#B1FF9C] mb-4">
                <table className="min-w-full bg-[#D1FFB5]">
                    <thead>
                    <tr>
                        <th className="py-2 border-b-4 border-[#B1FF9C]">Name</th>
                        <th className="py-2 border-b-4 border-[#B1FF9C]">Superpower</th>
                        <th className="py-2 border-b-4 border-[#B1FF9C]">Humility Score</th>
                        <th className="py-2 border-b-4 border-[#B1FF9C]">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {superheroes.map((hero) => (
                        <tr key={hero.id}>
                            <td className="border px-4 py-2 border-[#B1FF9C]">{hero.name}</td>
                            <td className="border px-4 py-2 border-[#B1FF9C]">{hero.superpower}</td>
                            <td className="border px-4 py-2 border-[#B1FF9C]">{hero.humilityScore}</td>
                            <td className="border px-4 py-2 border-[#B1FF9C]">
                                <button onClick={() => deleteSuperhero(hero.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <button onClick={() => setModalIsOpen(true)} className="self-end">
                <img src={addButton} alt="Add" className="h-12 w-12" />
            </button>
        </div>
    );
};

export default SuperheroManager;