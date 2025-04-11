import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StatCard from '../components/dashboard/StatCard';
import RecentAnimalsTable from '../components/dashboard/RecentAnimalsTable';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import { fetchDashboardData } from '../api/dashboardApi';

const Dashboard: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboardData'],
        queryFn: fetchDashboardData
    });

    if (isLoading || !data) {
        return <div className="p-8">Cargando...</div>;
    }

    const { stats, recentAnimals, events } = data;

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600">Bienvenido al sistema de gestión de refugios animales</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Animales"
                    value={stats.totalAnimals.value}
                    change={stats.totalAnimals.change}
                    isPositive={true}
                />
                <StatCard
                    title="Adopciones"
                    value={stats.adoptions.value}
                    change={stats.adoptions.change}
                    isPositive={true}
                />
                <StatCard
                    title="Voluntarios"
                    value={stats.volunteers.value}
                    change={stats.volunteers.change}
                    isPositive={false}
                />
                <StatCard
                    title="Eventos"
                    value={stats.events.value}
                    change={stats.events.change}
                    isPositive={true}
                />
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Animales Recientes</h2>
                <RecentAnimalsTable animals={recentAnimals} />
            </div>

            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Próximos Eventos</h2>
                <UpcomingEvents events={events} />
            </div>
        </div>
    );
};

export default Dashboard;