import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  User,
  Home,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Phone,
  Mail,
  MapPin
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

// Mock adoption processes data
const adoptionProcesses = [
  {
    id: 1,
    animalName: 'Luna',
    animalId: 1,
    applicant: {
      name: 'Laura Martínez',
      email: 'laura.martinez@email.com',
      phone: '+34 666 123 456',
      address: 'Calle Mayor 123, Madrid'
    },
    currentStage: 3,
    stages: [
      { id: 1, name: 'Solicitud', status: 'completed', date: '2024-06-18' },
      { id: 2, name: 'Entrevista', status: 'completed', date: '2024-06-20' },
      { id: 3, name: 'Visita al hogar', status: 'in_progress', date: '2024-06-25' },
      { id: 4, name: 'Entrega', status: 'pending', date: null }
    ],
    notes: 'Familia con experiencia previa con perros. Casa con jardín amplio.',
    visitDetails: {
      date: '2024-06-25',
      time: '16:00',
      volunteer: 'Ana García'
    }
  },
  {
    id: 2,
    animalName: 'Milo',
    animalId: 2,
    applicant: {
      name: 'Carlos Rodríguez',
      email: 'carlos.r@email.com',
      phone: '+34 677 987 654',
      address: 'Avenida España 45, Barcelona'
    },
    currentStage: 2,
    stages: [
      { id: 1, name: 'Solicitud', status: 'completed', date: '2024-06-22' },
      { id: 2, name: 'Entrevista', status: 'in_progress', date: '2024-06-26' },
      { id: 3, name: 'Visita al hogar', status: 'pending', date: null },
      { id: 4, name: 'Entrega', status: 'pending', date: null }
    ],
    notes: 'Primera mascota. Muy entusiasmado y preparado.',
    visitDetails: null
  },
  {
    id: 3,
    animalName: 'Simba',
    animalId: 5,
    applicant: {
      name: 'María López',
      email: 'maria.lopez@email.com',
      phone: '+34 688 111 222',
      address: 'Plaza Central 8, Valencia'
    },
    currentStage: 4,
    stages: [
      { id: 1, name: 'Solicitud', status: 'completed', date: '2024-06-15' },
      { id: 2, name: 'Entrevista', status: 'completed', date: '2024-06-17' },
      { id: 3, name: 'Visita al hogar', status: 'completed', date: '2024-06-22' },
      { id: 4, name: 'Entrega', status: 'in_progress', date: '2024-06-24' }
    ],
    notes: 'Proceso ejemplar. Lista para la entrega.',
    visitDetails: null
  }
];

function AdoptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcess, setSelectedProcess] = useState(null);

  const filteredProcesses = adoptionProcesses.filter(process =>
    process.animalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageStatus = (stage, currentStage) => {
    if (stage.id < currentStage) return 'completed';
    if (stage.id === currentStage) return 'in_progress';
    return 'pending';
  };

  const getStageIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress': return <Clock className="h-5 w-5 text-orange-500" />;
      case 'pending': return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
      default: return null;
    }
  };

  const getStatusBadge = (currentStage) => {
    const stageNames = {
      1: { label: 'Solicitud', variant: 'info' },
      2: { label: 'Entrevista', variant: 'warning' },
      3: { label: 'Visita al hogar', variant: 'purple' },
      4: { label: 'Entrega', variant: 'success' }
    };
    
    const stage = stageNames[currentStage];
    return <Badge variant={stage.variant}>{stage.label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Adopciones</h1>
          <p className="text-gray-600 mt-1">
            Gestiona los procesos de adopción en curso
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Adopción
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <SearchInput
                placeholder="Buscar por animal o adoptante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClear={() => setSearchTerm('')}
              />
            </div>
            <Button variant="secondary">
              <Search className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Adoption Processes List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredProcesses.map((process) => (
            <Card 
              key={process.id} 
              className={`cursor-pointer transition-all ${
                selectedProcess?.id === process.id ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedProcess(process)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar fallback={process.animalName.charAt(0)} size="default" color="purple" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {process.animalName}
                      </h3>
                      <p className="text-gray-600">{process.applicant.name}</p>
                    </div>
                  </div>
                  {getStatusBadge(process.currentStage)}
                </div>

                {/* Progress Steps */}
                <div className="flex items-center space-x-4 mb-4">
                  {process.stages.map((stage, index) => {
                    const status = getStageStatus(stage, process.currentStage);
                    return (
                      <div key={stage.id} className="flex items-center">
                        <div className="flex flex-col items-center">
                          {getStageIcon(status)}
                          <span className={`text-xs mt-1 ${
                            status === 'completed' ? 'text-green-600' :
                            status === 'in_progress' ? 'text-orange-600' : 'text-gray-400'
                          }`}>
                            {stage.name}
                          </span>
                        </div>
                        {index < process.stages.length - 1 && (
                          <div className={`w-8 h-px mx-2 ${
                            status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {process.applicant.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {process.applicant.phone}
                    </span>
                  </div>
                  {process.visitDetails && (
                    <span className="flex items-center text-purple-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      Visita: {process.visitDetails.date}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredProcesses.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron procesos
                </h3>
                <p className="text-gray-600">
                  No hay procesos de adopción que coincidan con la búsqueda.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Process Details */}
        <div className="space-y-6">
          {selectedProcess ? (
            <>
              {/* Current Stage Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                    Etapa Actual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {selectedProcess.stages[selectedProcess.currentStage - 1]?.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        En progreso para {selectedProcess.animalName}
                      </p>
                    </div>

                    {selectedProcess.visitDetails && selectedProcess.currentStage === 3 && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2">Detalles de la Visita</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-blue-800">
                            <Calendar className="h-4 w-4 mr-2" />
                            {selectedProcess.visitDetails.date} a las {selectedProcess.visitDetails.time}
                          </div>
                          <div className="flex items-center text-blue-800">
                            <MapPin className="h-4 w-4 mr-2" />
                            {selectedProcess.applicant.address}
                          </div>
                          <div className="flex items-center text-blue-800">
                            <User className="h-4 w-4 mr-2" />
                            Responsable: {selectedProcess.visitDetails.volunteer}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button size="sm" variant="danger" className="flex-1">
                        Rechazar
                      </Button>
                      <Button size="sm" variant="secondary" className="flex-1">
                        Reprogramar
                      </Button>
                      <Button size="sm" className="flex-1">
                        Aprobar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Applicant Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Información del Adoptante</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Nombre</label>
                      <p className="text-gray-900">{selectedProcess.applicant.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{selectedProcess.applicant.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Teléfono</label>
                      <p className="text-gray-900">{selectedProcess.applicant.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Dirección</label>
                      <p className="text-gray-900">{selectedProcess.applicant.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Notas del Proceso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedProcess.notes}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-3 w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir nota
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Home className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecciona un proceso
                </h3>
                <p className="text-gray-600">
                  Haz clic en un proceso de adopción para ver los detalles.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdoptionsPage;