import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SuperheroManager = () => {
    const [superheroes, setSuperheroes] = useState([]);
    const [stats, setStats] = useState({});
    const [newSuperhero, setNewSuperhero] = useState({name: '', superpower: '', humilityScore: ''});

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
    };

    const deleteSuperhero = async (id) => {
        await axios.delete(`http://localhost:3000/api/v1/superheroes/${id}`);
        fetchSuperheroes();
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div
                    className="bg-[#D1FFB5] flex flex-col justify-center items-center text-black p-4 rounded-xl border-4 border-[#B1FF9C]">
                    <h2 className="text-sm font-semibold">Number of Superheroes</h2>
                    <p className="text-2xl font-semibold my-2">{stats.numberOfSuperheroes}</p>
                </div>
                <div
                    className="bg-[#D1FFB5] flex flex-col justify-center items-center text-black p-4 rounded-xl border-4 border-[#B1FF9C]">
                    <h2 className="text-sm font-semibold">Avg. Humility Score</h2>
                    <p className="text-2xl font-semibold my-2">{stats.avgHumilityScore}</p>
                </div>
                <div
                    className="bg-[#D1FFB5] flex flex-col justify-center items-center text-black p-4 rounded-xl border-4 border-[#B1FF9C]">
                    <h2 className="text-sm font-semibold">Max Humility Score</h2>
                    <p className="text-2xl font-semibold my-2">{stats.maxHumilityScore}</p>
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={newSuperhero.name}
                    onChange={(e) => setNewSuperhero({...newSuperhero, name: e.target.value})}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Superpower"
                    value={newSuperhero.superpower}
                    onChange={(e) => setNewSuperhero({...newSuperhero, superpower: e.target.value})}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Humility Score"
                    value={newSuperhero.humilityScore}
                    onChange={(e) => setNewSuperhero({...newSuperhero, humilityScore: e.target.value})}
                    className="border p-2 mr-2"
                />
                <button onClick={addSuperhero} className="bg-blue-500 text-white p-2 rounded">Add Superhero</button>
            </div>

            <div className="min-w-full bg-[#D1FFB5] rounded-xl border-4 border-[#B1FF9C]">
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
                                <button onClick={() => deleteSuperhero(hero.id)}
                                        className="bg-red-500 text-white p-2 rounded">Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuperheroManager;