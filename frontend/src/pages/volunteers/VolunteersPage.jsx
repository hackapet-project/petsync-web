import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
  Award,
  Phone,
  Mail,
  MapPin,
  User,
  TrendingUp
} from 'lucide-react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Badge, 
  Avatar, 
  SearchInput 
} from '../../components/ui';
import { volunteers, volunteerTasks, scheduleData, volunteerMetrics } from '../../constants/volunteersData';

function VolunteersPage() {
  const [activeTab, setActiveTab] = useState('listado');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const tabs = [
    { id: 'listado', label: 'Listado', icon: Users },
    { id: 'horarios', label: 'Horarios', icon: Calendar },
    { id: 'tareas', label: 'Tareas', icon: CheckCircle },
    { id: 'capacitacion', label: 'Capacitación', icon: Award }
  ];

  const filteredVolunteers = volunteers.filter(volunteer =>
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'activo': return 'success';
      case 'temporal': return 'warning';
      case 'inactivo': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'activo': return 'Activo';
      case 'temporal': return 'Temporal';
      case 'inactivo': return 'Inactivo';
      default: return status;
    }
  };

  const getTaskPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return 'danger';
      case 'media': return 'warning';
      case 'baja': return 'default';
      default: return 'default';
    }
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'completada': return 'success';
      case 'en-progreso': return 'warning';
      case 'pendiente': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Voluntarios</h1>
          <p className="text-gray-600 mt-1">
            Gestiona voluntarios, horarios y asignación de tareas
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Añadir voluntario
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{volunteerMetrics.total}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Horas</p>
                <p className="text-2xl font-bold text-gray-900">{volunteerMetrics.hours}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tareas pendientes</p>
                <p className="text-2xl font-bold text-gray-900">{volunteerMetrics.pendingTasks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cobertura turnos</p>
                <p className="text-2xl font-bold text-gray-900">{volunteerMetrics.shiftCoverage}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'listado' && (
        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <SearchInput
                    placeholder="Buscar por nombre o habilidades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClear={() => setSearchTerm('')}
                  />
                </div>
                <Button variant="secondary">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Volunteers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVolunteers.map((volunteer) => (
              <Card 
                key={volunteer.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedVolunteer(volunteer)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        fallback={volunteer.avatar}
                        size="default"
                        color={volunteer.color}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{volunteer.name}</h3>
                        <p className="text-sm text-gray-600">{volunteer.specialization}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(volunteer.status)}>
                      {getStatusLabel(volunteer.status)}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-3 w-3 mr-2" />
                      Desde: {new Date(volunteer.joinDate).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-3 w-3 mr-2" />
                      {volunteer.hours} horas acumuladas
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 mr-2" />
                      {volunteer.pendingTasks} tareas pendientes
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Habilidades:</p>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="default" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {volunteer.skills.length > 3 && (
                        <Badge variant="default" className="text-xs">
                          +{volunteer.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                    <Button size="sm" variant="ghost" className="flex-1">
                      Asignar tarea
                    </Button>
                    <Button size="sm" variant="ghost" className="flex-1">
                      Ver perfil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'horarios' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cobertura de Turnos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{scheduleData.coverage.morning}%</div>
                  <div className="text-sm text-gray-600">Mañana (8:00-14:00)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{scheduleData.coverage.afternoon}%</div>
                  <div className="text-sm text-gray-600">Tarde (14:00-20:00)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{scheduleData.coverage.evening}%</div>
                  <div className="text-sm text-gray-600">Noche (20:00-02:00)</div>
                </div>
              </div>
              
              <div className="space-y-3">
                {scheduleData.shifts.map((shift, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="font-medium text-gray-900">{shift.time}</div>
                    <div className="flex space-x-2">
                      {shift.volunteers.map(volunteerId => {
                        const volunteer = volunteers.find(v => v.id === volunteerId);
                        return volunteer ? (
                          <div key={volunteerId} className="flex items-center space-x-2">
                            <Avatar
                              fallback={volunteer.avatar}
                              size="sm"
                              color={volunteer.color}
                            />
                            <span className="text-sm text-gray-700">{volunteer.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'tareas' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tareas Asignadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {volunteerTasks.map((task) => {
                  const assignedVolunteer = volunteers.find(v => v.id === task.assignedTo);
                  return (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <div className="flex space-x-2">
                          <Badge variant={getTaskPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge variant={getTaskStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-500">Asignado a:</span>
                          <p className="text-gray-900">{assignedVolunteer?.name}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Fecha límite:</span>
                          <p className="text-gray-900">{new Date(task.dueDate).toLocaleDateString('es-ES')}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Tiempo estimado:</span>
                          <p className="text-gray-900">{task.estimatedHours}h</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Categoría:</span>
                          <p className="text-gray-900">{task.category}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'capacitacion' && (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Módulo de Capacitación
            </h3>
            <p className="text-gray-600 mb-4">
              Sistema de capacitación y certificación para voluntarios.
            </p>
            <Button>Configurar capacitaciones</Button>
          </CardContent>
        </Card>
      )}

      {/* Volunteer Detail Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar
                    fallback={selectedVolunteer.avatar}
                    size="lg"
                    color={selectedVolunteer.color}
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedVolunteer.name}
                    </h2>
                    <p className="text-gray-600">{selectedVolunteer.specialization}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedVolunteer(null)}>
                  ×
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{selectedVolunteer.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Teléfono</label>
                  <p className="text-gray-900">{selectedVolunteer.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Estado</label>
                  <Badge variant={getStatusColor(selectedVolunteer.status)}>
                    {getStatusLabel(selectedVolunteer.status)}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Horas acumuladas</label>
                  <p className="text-gray-900">{selectedVolunteer.hours}h</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-2">Habilidades</label>
                <div className="flex flex-wrap gap-2">
                  {selectedVolunteer.skills.map((skill, index) => (
                    <Badge key={index} variant="default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button className="flex-1">Asignar tarea</Button>
                <Button variant="secondary" className="flex-1">Editar perfil</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VolunteersPage;