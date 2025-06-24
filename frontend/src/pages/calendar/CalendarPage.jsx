import React, { useState } from 'react';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Filter
} from 'lucide-react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Badge,
  Modal
} from '../../components/ui';
import { calendarEvents, eventTypes, generateCalendarDays } from '../../constants/calendarData';
import { allAnimals } from '../../constants/mockData';

function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(6); // June 2024
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedAnimals, setSelectedAnimals] = useState([]);

  const calendarDays = generateCalendarDays(currentYear, currentMonth);
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getSelectedDateEvents = () => {
    if (!selectedDate) return [];
    return calendarEvents.filter(event => event.date === selectedDate.dateStr);
  };

  const getEventTypeInfo = (type) => {
    return eventTypes[type] || eventTypes.evento;
  };

  const toggleAnimalSelection = (animalId) => {
    setSelectedAnimals(prev => 
      prev.includes(animalId) 
        ? prev.filter(id => id !== animalId)
        : [...prev, animalId]
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Calendario</h1>
          <p className="text-gray-600 mt-1">
            Gestiona eventos, citas y actividades del refugio
          </p>
        </div>
        <Button onClick={() => setShowEventModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {monthNames[currentMonth - 1]} {currentYear}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Animal Filter Chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button variant="ghost" size="sm" className="h-8">
                  <Filter className="h-3 w-3 mr-1" />
                  Todos
                </Button>
                {allAnimals.slice(0, 5).map((animal) => (
                  <Button
                    key={animal.id}
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                  >
                    {animal.name}
                  </Button>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Week Headers */}
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {calendarDays.map((day) => (
                  <div
                    key={day.dateStr}
                    className={`min-h-[100px] border border-gray-200 p-1 cursor-pointer hover:bg-gray-50 ${
                      !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                    } ${
                      day.isToday ? 'bg-blue-50 border-blue-300' : ''
                    } ${
                      selectedDate?.dateStr === day.dateStr ? 'bg-purple-50 border-purple-300' : ''
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      day.isToday ? 'text-blue-600' : 
                      selectedDate?.dateStr === day.dateStr ? 'text-purple-600' : ''
                    }`}>
                      {day.date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {day.events.slice(0, 3).map((event) => {
                        const typeInfo = getEventTypeInfo(event.type);
                        return (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded border truncate ${typeInfo.color}`}
                            title={event.title}
                          >
                            <span className="mr-1">{typeInfo.icon}</span>
                            {event.title}
                          </div>
                        );
                      })}
                      {day.events.length > 3 && (
                        <div className="text-xs text-gray-500 p-1">
                          +{day.events.length - 3} más
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Day Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? (
                  `${selectedDate.date.getDate()} ${monthNames[selectedDate.date.getMonth()]}`
                ) : (
                  'Selecciona un día'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                <div className="space-y-4">
                  {getSelectedDateEvents().length > 0 ? (
                    getSelectedDateEvents().map((event) => {
                      const typeInfo = getEventTypeInfo(event.type);
                      return (
                        <div key={event.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {event.title}
                            </h4>
                            <Badge variant="default" className={`text-xs ${typeInfo.color}`}>
                              {typeInfo.label}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.time} ({event.duration}min)
                            </div>
                            {event.animalName && (
                              <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {event.animalName}
                              </div>
                            )}
                            {event.description && (
                              <p className="text-gray-700 mt-2">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">No hay eventos programados</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Haz clic en un día para ver los eventos</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(eventTypes).map(([type, info]) => {
                  const count = calendarEvents.filter(e => 
                    e.type === type && 
                    e.date.startsWith(`${currentYear}-${String(currentMonth).padStart(2, '0')}`)
                  ).length;
                  
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-2">{info.icon}</span>
                        <span className="text-sm text-gray-700">{info.label}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Event Modal */}
      <Modal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        title="Añadir Evento"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del evento
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Ej: Consulta veterinaria"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
              >
                <option value="">Seleccionar categoría</option>
                {Object.entries(eventTypes).map(([type, info]) => (
                  <option key={type} value={type}>
                    {info.icon} {info.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora
              </label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              rows={3}
              placeholder="Descripción del evento..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Animales asignados
            </label>
            <div className="border border-gray-300 rounded-md p-3 max-h-32 overflow-y-auto">
              {allAnimals.slice(0, 8).map((animal) => (
                <label key={animal.id} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedAnimals.includes(animal.id)}
                    onChange={() => toggleAnimalSelection(animal.id)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{animal.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowEventModal(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowEventModal(false)}>
              Añadir evento
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CalendarPage;