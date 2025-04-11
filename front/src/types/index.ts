export interface Animal {
    id: number;
    name: string;
    species: string;
    age: string;
    entryDate: string;
    status: 'Disponible' | 'Tratamiento' | 'En adopción';
    color: string;
}

export interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    animals: string;
    volunteers: string;
    type: 'Evento' | 'Capacitación' | 'Salud';
    color: string;
}

export interface Stat {
    value: number;
    change: string;
}

export interface DashboardData {
    stats: {
        totalAnimals: Stat;
        adoptions: Stat;
        volunteers: Stat;
        events: Stat;
    };
    recentAnimals: Animal[];
    events: Event[];
}