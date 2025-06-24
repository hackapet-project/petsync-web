// Mock data for development - replace with real API calls

export const dashboardMetrics = {
  totalAnimals: { value: 127, change: 12, trend: 'up' },
  adoptions: { value: 42, change: 8, trend: 'up' },
  volunteers: { value: 38, change: 0, trend: 'neutral' },
  events: { value: 7, change: 2, trend: 'up' }
};

export const allAnimals = [
  {
    id: 1,
    name: 'Luna',
    species: 'Perro',
    breed: 'Labrador',
    age: '2 años',
    ageMonths: 24,
    birthDate: '2022-06-15',
    entryDate: '2024-06-15',
    status: 'disponible',
    avatar: 'L',
    color: 'purple',
    gender: 'Hembra',
    size: 'Grande',
    weight: 25.5
  },
  {
    id: 2,
    name: 'Milo',
    species: 'Gato',
    breed: 'Mestizo',
    age: '6 meses',
    ageMonths: 6,
    birthDate: '2023-12-10',
    entryDate: '2024-06-10',
    status: 'en-adopcion',
    avatar: 'M',
    color: 'green',
    gender: 'Macho',
    size: 'Pequeño',
    weight: 2.8
  },
  {
    id: 3,
    name: 'Bella',
    species: 'Perro',
    breed: 'Golden Retriever',
    age: '4 años',
    ageMonths: 48,
    birthDate: '2020-06-08',
    entryDate: '2024-06-08',
    status: 'tratamiento',
    avatar: 'B',
    color: 'orange',
    gender: 'Hembra',
    size: 'Grande',
    weight: 28.0
  },
  {
    id: 4,
    name: 'Rocky',
    species: 'Perro',
    breed: 'Pastor Alemán',
    age: '1 año',
    ageMonths: 12,
    birthDate: '2023-06-05',
    entryDate: '2024-06-05',
    status: 'disponible',
    avatar: 'R',
    color: 'red',
    gender: 'Macho',
    size: 'Grande',
    weight: 30.2
  },
  {
    id: 5,
    name: 'Simba',
    species: 'Gato',
    breed: 'Persa',
    age: '3 años',
    ageMonths: 36,
    birthDate: '2021-06-01',
    entryDate: '2024-06-01',
    status: 'en-adopcion',
    avatar: 'S',
    color: 'purple',
    gender: 'Macho',
    size: 'Mediano',
    weight: 4.5
  },
  {
    id: 6,
    name: 'Max',
    species: 'Perro',
    breed: 'Bulldog Francés',
    age: '5 años',
    ageMonths: 60,
    birthDate: '2019-05-20',
    entryDate: '2024-05-28',
    status: 'disponible',
    avatar: 'M',
    color: 'green',
    gender: 'Macho',
    size: 'Mediano',
    weight: 12.0
  },
  {
    id: 7,
    name: 'Coco',
    species: 'Gato',
    breed: 'Siamés',
    age: '1 año',
    ageMonths: 14,
    birthDate: '2023-04-15',
    entryDate: '2024-05-25',
    status: 'tratamiento',
    avatar: 'C',
    color: 'orange',
    gender: 'Hembra',
    size: 'Pequeño',
    weight: 3.2
  },
  {
    id: 8,
    name: 'Duke',
    species: 'Perro',
    breed: 'Rottweiler',
    age: '6 años',
    ageMonths: 72,
    birthDate: '2018-05-10',
    entryDate: '2024-05-20',
    status: 'disponible',
    avatar: 'D',
    color: 'red',
    gender: 'Macho',
    size: 'Grande',
    weight: 45.0
  },
  {
    id: 9,
    name: 'Nala',
    species: 'Gato',
    breed: 'Maine Coon',
    age: '2 años',
    ageMonths: 30,
    birthDate: '2022-02-14',
    entryDate: '2024-05-18',
    status: 'en-adopcion',
    avatar: 'N',
    color: 'purple',
    gender: 'Hembra',
    size: 'Grande',
    weight: 6.8
  },
  {
    id: 10,
    name: 'Rex',
    species: 'Perro',
    breed: 'Mestizo',
    age: '3 años',
    ageMonths: 36,
    birthDate: '2021-04-01',
    entryDate: '2024-05-15',
    status: 'disponible',
    avatar: 'R',
    color: 'green',
    gender: 'Macho',
    size: 'Mediano',
    weight: 18.5
  }
];

export const recentAnimals = allAnimals.slice(0, 5);

export const upcomingEvents = [
  {
    id: 1,
    title: 'Consulta veterinaria - Luna',
    type: 'salud',
    date: '2024-06-25',
    time: '10:00',
    participants: 1
  },
  {
    id: 2,
    title: 'Capacitación voluntarios',
    type: 'capacitacion',
    date: '2024-06-26',
    time: '14:00',
    participants: 8
  },
  {
    id: 3,
    title: 'Evento adopción',
    type: 'evento',
    date: '2024-06-28',
    time: '11:00',
    participants: 15
  },
  {
    id: 4,
    title: 'Revisión médica - Bella',
    type: 'salud',
    date: '2024-06-30',
    time: '09:30',
    participants: 1
  }
];

export const statusLabels = {
  'disponible': 'Disponible',
  'en-adopcion': 'En adopción',
  'tratamiento': 'Tratamiento',
  'temporal': 'Temporal'
};

export const statusColors = {
  'disponible': 'success',
  'en-adopcion': 'info',
  'tratamiento': 'danger',
  'temporal': 'warning'
};

export const eventTypeColors = {
  'salud': 'danger',
  'capacitacion': 'warning',
  'evento': 'success'
};

export const eventTypeLabels = {
  'salud': 'Salud',
  'capacitacion': 'Capacitación',
  'evento': 'Evento'
};