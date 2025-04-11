import React from 'react';
import { Animal } from '../../types';

interface RecentAnimalsTableProps {
    animals: Animal[];
}

const RecentAnimalsTable: React.FC<RecentAnimalsTableProps> = ({ animals }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Especie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de ingreso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {animals.map((animal) => (
                    <tr key={animal.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: animal.color }}>
                                </div>
                                <div className="ml-4">
                                    {animal.name}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {animal.species}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {animal.age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {animal.entryDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    animal.status === 'Disponible'
                        ? 'bg-green-100 text-green-800'
                        : animal.status === 'Tratamiento'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                }`}>
                  {animal.status}
                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="bg-indigo-600 text-white px-3 py-1 rounded text-sm">
                                Ver detalles
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white">
                            1
                        </a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600">
                            2
                        </a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white">
                            3
                        </a>
                        <a href="#" className="relative inline-flex items-center px-2 py-2 text-gray-500 bg-white text-sm font-medium">
                            &gt;
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default RecentAnimalsTable;