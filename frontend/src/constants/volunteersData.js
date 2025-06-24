// Mock volunteers data

export const volunteers = [
  {
    id: 1,
    name: 'Ana García',
    email: 'ana.garcia@email.com',
    phone: '+34 666 123 456',
    joinDate: '2024-01-15',
    status: 'activo',
    hours: 89,
    skills: ['Cuidado de perros', 'Administración', 'Capacitación'],
    specialization: 'Cuidado animal',
    availability: {
      monday: ['09:00-13:00'],
      tuesday: [],
      wednesday: ['14:00-18:00'],
      thursday: ['09:00-13:00'],
      friday: [],
      saturday: ['10:00-16:00'],
      sunday: []
    },
    pendingTasks: 2,
    completedTasks: 15,
    avatar: 'A',
    color: 'purple'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '+34 677 987 654',
    joinDate: '2024-02-20',
    status: 'activo',
    hours: 67,
    skills: ['Veterinaria básica', 'Transporte', 'Eventos'],
    specialization: 'Atención veterinaria',
    availability: {
      monday: ['16:00-20:00'],
      tuesday: ['16:00-20:00'],
      wednesday: [],
      thursday: ['16:00-20:00'],
      friday: ['16:00-20:00'],
      saturday: [],
      sunday: ['10:00-14:00']
    },
    pendingTasks: 1,
    completedTasks: 22,
    avatar: 'C',
    color: 'green'
  },
  {
    id: 3,
    name: 'María López',
    email: 'maria.lopez@email.com',
    phone: '+34 688 111 222',
    joinDate: '2024-03-10',
    status: 'temporal',
    hours: 34,
    skills: ['Socialización', 'Fotografía', 'Redes sociales'],
    specialization: 'Comunicación',
    availability: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: ['09:00-17:00'],
      sunday: ['09:00-17:00']
    },
    pendingTasks: 0,
    completedTasks: 8,
    avatar: 'M',
    color: 'orange'
  },
  {
    id: 4,
    name: 'David Martín',
    email: 'david.martin@email.com',
    phone: '+34 699 333 444',
    joinDate: '2023-11-05',
    status: 'activo',
    hours: 156,
    skills: ['Mantenimiento', 'Construcción', 'Limpieza'],
    specialization: 'Mantenimiento',
    availability: {
      monday: ['08:00-12:00'],
      tuesday: ['08:00-12:00'],
      wednesday: ['08:00-12:00'],
      thursday: ['08:00-12:00'],
      friday: ['08:00-12:00'],
      saturday: [],
      sunday: []
    },
    pendingTasks: 3,
    completedTasks: 45,
    avatar: 'D',
    color: 'red'
  },
  {
    id: 5,
    name: 'Laura Fernández',
    email: 'laura.fernandez@email.com',
    phone: '+34 611 555 666',
    joinDate: '2024-04-18',
    status: 'activo',
    hours: 45,
    skills: ['Educación', 'Capacitación', 'Eventos'],
    specialization: 'Educación',
    availability: {
      monday: [],
      tuesday: ['17:00-20:00'],
      wednesday: [],
      thursday: ['17:00-20:00'],
      friday: [],
      saturday: ['10:00-18:00'],
      sunday: []
    },
    pendingTasks: 4,
    completedTasks: 12,
    avatar: 'L',
    color: 'purple'
  },
  {
    id: 6,
    name: 'Roberto Silva',
    email: 'roberto.silva@email.com',
    phone: '+34 622 777 888',
    joinDate: '2024-01-30',
    status: 'inactivo',
    hours: 23,
    skills: ['Transporte', 'Logística'],
    specialization: 'Logística',
    availability: {},
    pendingTasks: 0,
    completedTasks: 5,
    avatar: 'R',
    color: 'gray'
  }
];

export const volunteerTasks = [
  {
    id: 1,
    title: 'Limpieza jaulas sector A',
    description: 'Limpieza profunda de las jaulas del sector A',
    assignedTo: 1,
    priority: 'alta',
    status: 'pendiente',
    dueDate: '2024-06-25',
    estimatedHours: 3,
    category: 'limpieza'
  },
  {
    id: 2,
    title: 'Transporte Luna a veterinario',
    description: 'Llevar a Luna a su cita veterinaria',
    assignedTo: 2,
    priority: 'alta',
    status: 'en-progreso',
    dueDate: '2024-06-25',
    estimatedHours: 2,
    category: 'transporte'
  },
  {
    id: 3,
    title: 'Sesión socialización cachorros',
    description: 'Sesión de socialización para cachorros nuevos',
    assignedTo: 3,
    priority: 'media',
    status: 'completada',
    dueDate: '2024-06-24',
    estimatedHours: 2,
    category: 'cuidado'
  },
  {
    id: 4,
    title: 'Reparación valla trasera',
    description: 'Reparar sección dañada de la valla trasera',
    assignedTo: 4,
    priority: 'alta',
    status: 'pendiente',
    dueDate: '2024-06-26',
    estimatedHours: 4,
    category: 'mantenimiento'
  },
  {
    id: 5,
    title: 'Capacitación nuevos voluntarios',
    description: 'Sesión de capacitación para voluntarios nuevos',
    assignedTo: 5,
    priority: 'media',
    status: 'pendiente',
    dueDate: '2024-06-28',
    estimatedHours: 3,
    category: 'capacitacion'
  }
];

export const scheduleData = {
  shifts: [
    { time: '08:00-12:00', volunteers: [4] },
    { time: '09:00-13:00', volunteers: [1] },
    { time: '14:00-18:00', volunteers: [1] },
    { time: '16:00-20:00', volunteers: [2] },
    { time: '17:00-20:00', volunteers: [5] }
  ],
  coverage: {
    morning: 85,
    afternoon: 92,
    evening: 67
  }
};

export const volunteerMetrics = {
  total: 38,
  hours: 342,
  pendingTasks: 12,
  shiftCoverage: 85
};