// Mock calendar and events data

export const calendarEvents = [
  {
    id: 1,
    title: 'Consulta veterinaria - Luna',
    type: 'veterinario',
    date: '2024-06-25',
    time: '10:00',
    duration: 60,
    animalId: 1,
    animalName: 'Luna',
    description: 'Revisión general y vacunación',
    veterinarian: 'Dr. García',
    status: 'programado'
  },
  {
    id: 2,
    title: 'Capacitación voluntarios',
    type: 'capacitacion',
    date: '2024-06-26',
    time: '14:00',
    duration: 120,
    animalId: null,
    animalName: null,
    description: 'Formación en manejo de animales rescatados',
    instructor: 'María López',
    status: 'programado'
  },
  {
    id: 3,
    title: 'Evento adopción',
    type: 'evento',
    date: '2024-06-28',
    time: '11:00',
    duration: 240,
    animalId: null,
    animalName: null,
    description: 'Jornada de adopción en el parque central',
    organizer: 'Ana García',
    status: 'programado'
  },
  {
    id: 4,
    title: 'Revisión médica - Bella',
    type: 'veterinario',
    date: '2024-06-30',
    time: '09:30',
    duration: 45,
    animalId: 3,
    animalName: 'Bella',
    description: 'Control tratamiento dermatológico',
    veterinarian: 'Dra. López',
    status: 'programado'
  },
  {
    id: 5,
    title: 'Limpieza instalaciones',
    type: 'mantenimiento',
    date: '2024-06-27',
    time: '08:00',
    duration: 180,
    animalId: null,
    animalName: null,
    description: 'Limpieza profunda de todas las áreas',
    responsable: 'Equipo de mantenimiento',
    status: 'programado'
  },
  {
    id: 6,
    title: 'Cita veterinaria - Milo',
    type: 'veterinario',
    date: '2024-06-24',
    time: '16:30',
    duration: 30,
    animalId: 2,
    animalName: 'Milo',
    description: 'Castración programada',
    veterinarian: 'Dr. García',
    status: 'completado'
  },
  {
    id: 7,
    title: 'Reunión equipo',
    type: 'reunion',
    date: '2024-06-29',
    time: '10:00',
    duration: 90,
    animalId: null,
    animalName: null,
    description: 'Reunión semanal del equipo',
    moderator: 'Victoria Rodríguez',
    status: 'programado'
  }
];

export const eventTypes = {
  veterinario: {
    label: 'Cita Veterinario',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '🏥'
  },
  capacitacion: {
    label: 'Capacitación',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: '📚'
  },
  evento: {
    label: 'Evento',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '🎉'
  },
  mantenimiento: {
    label: 'Mantenimiento',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: '🔧'
  },
  reunion: {
    label: 'Reunión',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: '👥'
  }
};

export const generateCalendarDays = (year = 2024, month = 6) => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startDate = new Date(firstDay);
  const endDate = new Date(lastDay);
  
  // Adjust to start on Monday
  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
  // Adjust to end on Sunday
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  
  const days = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayEvents = calendarEvents.filter(event => event.date === dateStr);
    
    days.push({
      date: new Date(currentDate),
      dateStr,
      isCurrentMonth: currentDate.getMonth() === month - 1,
      isToday: dateStr === new Date().toISOString().split('T')[0],
      events: dayEvents
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
};