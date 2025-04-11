import { DashboardData } from '../types';

// Mock call
export const fetchDashboardData = async (): Promise<DashboardData> => {

    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        stats: {
            totalAnimals: { value: 127, change: '12% este mes' },
            adoptions: { value: 42, change: '8% este mes' },
            volunteers: { value: 38, change: 'igual que el mes pasado' },
            events: { value: 7, change: '2 nuevos planificados' }
        },
        recentAnimals: [
            {
                id: 1,
                name: 'Pelusa',
                species: 'Perro',
                age: '2 años',
                entryDate: '12/04/2025',
                status: 'Disponible',
                color: '#FFB900'
            },
            {
                id: 2,
                name: 'Mia',
                species: 'Gato',
                age: '1 año',
                entryDate: '10/04/2025',
                status: 'Tratamiento',
                color: '#F25022'
            },
            {
                id: 3,
                name: 'Rubio',
                species: 'Perro',
                age: '3 años',
                entryDate: '05/04/2025',
                status: 'En adopción',
                color: '#7FBA00'
            },
            {
                id: 4,
                name: 'Simba',
                species: 'Gato',
                age: '5 meses',
                entryDate: '03/04/2025',
                status: 'Disponible',
                color: '#8661C5'
            }
        ],
        events: [
            {
                id: 1,
                title: 'Día de adopción',
                date: '15 Abril, 2025',
                time: '10:00-18:00',
                animals: '25 animales',
                volunteers: '12 voluntarios',
                type: 'Evento',
                color: '#4B53BC'
            },
            {
                id: 2,
                title: 'Entrenamiento de voluntarios',
                date: '20 Abril, 2025',
                time: '15:00-17:00',
                animals: '0 animales',
                volunteers: '8 voluntarios',
                type: 'Capacitación',
                color: '#FF8C00'
            },
            {
                id: 3,
                title: 'Campaña de vacunación',
                date: '25 Abril, 2025',
                time: '09:00-14:00',
                animals: '45 animales',
                volunteers: '5 voluntarios',
                type: 'Salud',
                color: '#2BAC76'
            }
        ]
    };
};
