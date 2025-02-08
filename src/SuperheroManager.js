import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import addButton from './assets/add.png';
import deleteButton from './assets/delete.png';
import editButton from './assets/edit.png';

Modal.setAppElement('#root');

const SuperheroManager = () => {
    const [superheroes, setSuperheroes] = useState([]);
    const [stats, setStats] = useState({});
    const [newSuperhero, setNewSuperhero] = useState({ name: '', superpower: '', humilityScore: '' });
    const [editSuperhero, setEditSuperhero] = useState(null);
    const [deleteSuperhero, setDeleteSuperhero] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
        try {
            await axios.post('http://localhost:3000/api/v1/superheroes', newSuperhero);
            fetchSuperheroes();
            fetchStats();
            setModalIsOpen(false);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to add superhero. Please try again.');
        }
    };

    const editSuperheroDetails = async () => {
        try {
            await axios.patch(`http://localhost:3000/api/v1/superheroes/${editSuperhero.id}`, editSuperhero);
            fetchSuperheroes();
            fetchStats();
            setEditModalIsOpen(false);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to edit superhero. Please try again.');
        }
    };

    const confirmDeleteSuperhero = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/superheroes/${deleteSuperhero.id}`);
            fetchSuperheroes();
            fetchStats();
            setDeleteModalIsOpen(false);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to delete superhero. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-col">
            <div className="flex flex-col gap-2 mb-4">
                <h1 className="text-2xl font-bold">Superhero Manager</h1>
                <p className="text-sm font-semibold">This is a simple app to manage superheroes. You can add, edit, delete, and view superheroes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-[#D1FFB5] flex flex-col justify-center items-center text-black p-4 rounded-xl border-4 border-[#B1FF9C]">
                    <h2 className="text-sm font-semibold">Number of Superheroes</h2>
                    <p className="text-2xl font-semibold my-2">{stats.numberOfSuperheroes}</p>
                </div>
                <div className="bg-[#D1FFB5] flex flex-col justify-center items-center text-black p-4 rounded-xl border-4 border-[#B1FF9C]">
                    <h2 className="text-sm font-semibold">Avg. Humility Score</h2>
                    <p className="text-2xl font-semibold my-2">{stats.avgHumilityScore?.toFixed(2)}</p>
                </div>
                <div className="bg-[#D1FFB5] flex flex-col justify-center items-center text-black p-4 rounded-xl border-4 border-[#B1FF9C]">
                    <h2 className="text-sm font-semibold">Max Humility Score</h2>
                    <p className="text-2xl font-semibold my-2">{stats.maxHumilityScore}</p>
                </div>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="bg-[#D1FFB5] p-4 rounded-xl border-4 border-[#B1FF9C] max-w-md mx-auto mt-20">
                <h2 className="text-xl mb-4">Add New Superhero</h2>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
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

            <Modal isOpen={editModalIsOpen} onRequestClose={() => setEditModalIsOpen(false)} className="bg-[#D1FFB5] p-4 rounded-xl border-4 border-[#B1FF9C] max-w-md mx-auto mt-20">
                <h2 className="text-xl mb-4">Edit Superhero</h2>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    value={editSuperhero?.name || ''}
                    onChange={(e) => setEditSuperhero({ ...editSuperhero, name: e.target.value })}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Superpower"
                    value={editSuperhero?.superpower || ''}
                    onChange={(e) => setEditSuperhero({ ...editSuperhero, superpower: e.target.value })}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Humility Score"
                    value={editSuperhero?.humilityScore || ''}
                    onChange={(e) => setEditSuperhero({ ...editSuperhero, humilityScore: e.target.value })}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <button onClick={editSuperheroDetails} className="bg-black p-2 rounded-lg w-full mt-4 text-[#D1FFB5]">Save Changes</button>
                <button onClick={() => setEditModalIsOpen(false)} className="text-black p-2 rounded-lg border-4 border-black w-full mt-2 font-semibold">Cancel</button>
            </Modal>

            <Modal isOpen={deleteModalIsOpen} onRequestClose={() => setDeleteModalIsOpen(false)} className="bg-[#D1FFB5] p-4 rounded-xl border-4 border-[#B1FF9C] max-w-md mx-auto mt-20">
                <h2 className="text-xl mb-4">Delete Superhero</h2>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <p>Are you sure you want to delete superhero {deleteSuperhero?.name}?</p>
                <button onClick={confirmDeleteSuperhero} className="bg-red-500 p-2 rounded-lg w-full mt-4 text-white">Delete</button>
                <button onClick={() => setDeleteModalIsOpen(false)} className="text-black p-2 rounded-lg border-4 border-black w-full mt-2 font-semibold">Cancel</button>
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
                            <td className="px-4 py-2">{hero.name}</td>
                            <td className="px-4 py-2">{hero.superpower}</td>
                            <td className="px-4 py-2">{hero.humilityScore}</td>
                            <td className="px-4 py-2 flex flex-row gap-2 justify-center items-center h-full min-w-[100px]">
                                <button onClick={() => { setEditSuperhero(hero); setEditModalIsOpen(true); }}>
                                    <img src={editButton} alt="Edit" className="h-6 w-6" />
                                </button>
                                <button onClick={() => { setDeleteSuperhero(hero); setDeleteModalIsOpen(true); }}>
                                    <img src={deleteButton} alt="Delete" className="h-6 w-6" />
                                </button>
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