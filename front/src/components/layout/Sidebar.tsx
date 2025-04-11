import React from 'react';
import { NavLink } from 'react-router-dom';

interface MenuItem {
    name: string;
    path: string;
    icon: string;
}

const Sidebar: React.FC = () => {
    const menuItems: MenuItem[] = [
        { name: 'Dashboard', path: '/', icon: '⚪' },
        { name: 'Animales', path: '/animales', icon: '⚪' },
        { name: 'Adopciones', path: '/adopciones', icon: '⚪' },
        { name: 'Voluntarios', path: '/voluntarios', icon: '⚪' },
        { name: 'Calendario', path: '/calendario', icon: '⚪' },
        { name: 'Configuración', path: '/configuracion', icon: '⚪' },
    ];

    return (
        <div className="w-60 bg-indigo-700 text-white flex flex-col h-full">
            <div className="p-5">
                <h1 className="text-3xl font-bold">Hack</h1>
                <h1 className="text-3xl font-bold">a pet</h1>
            </div>

            <nav className="flex-1 mt-6">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.name} className="mb-2">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center px-5 py-3 rounded-lg ${
                                        isActive ? 'bg-indigo-800' : 'hover:bg-indigo-600'
                                    }`
                                }
                            >
                                <span className="mr-3">{item.icon}</span>
                                <span>{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-5 flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <span className="ml-3">Victoria Rodríguez</span>
            </div>
        </div>
    );
};

export default Sidebar;