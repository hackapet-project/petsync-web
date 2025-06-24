import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Weight, 
  Activity, 
  Calendar, 
  Plus,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Badge 
} from '../../components/ui';
import { allAnimals } from '../../constants/mockData';

// Mock weight history data
const generateWeightHistory = (animal) => {
  const startDate = new Date(animal.entryDate);
  const data = [];
  const baseWeight = animal.weight - 2;
  
  for (let i = 0; i < 8; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (i * 7));
    
    const weight = baseWeight + (i * 0.3) + (Math.random() * 0.4 - 0.2);
    data.push({
      date: date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
      weight: parseFloat(weight.toFixed(1)),
      notes: i === 3 ? 'Cambio de dieta' : ''
    });
  }
  
  return data;
};

// Mock treatment history
const generateTreatmentHistory = (animal) => {
  const treatments = [
    {
      id: 1,
      type: 'Vacunación',
      status: 'completado',
      startDate: '2024-06-15',
      endDate: '2024-06-15',
      veterinarian: 'Dr. García',
      dosage: 'Dosis única',
      notes: 'Vacuna polivalente canina'
    },
    {
      id: 2,
      type: 'Desparasitación',
      status: 'completado',
      startDate: '2024-06-16',
      endDate: '2024-06-16',
      veterinarian: 'Dr. García',
      dosage: '1 comprimido',
      notes: 'Desparasitante interno'
    }
  ];

  if (animal.status === 'tratamiento') {
    treatments.push({
      id: 3,
      type: 'Tratamiento dermatológico',
      status: 'activo',
      startDate: '2024-06-20',
      endDate: '2024-07-05',
      veterinarian: 'Dra. López',
      dosage: '2 veces al día',
      notes: 'Champú medicinal para dermatitis'
    });
  }

  return treatments;
};

function MedicalHistoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = allAnimals.find(a => a.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('peso');

  if (!animal) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Animal no encontrado</h1>
          <Button onClick={() => navigate('/animals')}>Volver a la lista</Button>
        </div>
      </div>
    );
  }

  const weightHistory = generateWeightHistory(animal);
  const treatmentHistory = generateTreatmentHistory(animal);
  const idealWeight = animal.species === 'Perro' ? animal.weight + 1 : animal.weight + 0.5;

  const tabs = [
    { id: 'peso', label: 'Historial de Peso', icon: Weight },
    { id: 'tratamientos', label: 'Tratamientos', icon: Activity },
    { id: 'visitas', label: 'Historial de Visitas', icon: Calendar },
    { id: 'comportamental', label: 'Comportamental', icon: TrendingUp }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'activo': return 'success';
      case 'completado': return 'default';
      case 'programado': return 'warning';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'activo': return 'Activo';
      case 'completado': return 'Completado';
      case 'programado': return 'Programado';
      default: return status;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(`/animals/${id}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al perfil
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Historial Médico - {animal.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Seguimiento médico y de salud
            </p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Registro
        </Button>
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

      {/* Weight History Tab */}
      {activeTab === 'peso' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolución del Peso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip 
                      labelFormatter={(value) => `Fecha: ${value}`}
                      formatter={(value) => [`${value} kg`, 'Peso']}
                    />
                    <ReferenceLine 
                      y={idealWeight} 
                      stroke="#10b981" 
                      strokeDasharray="5 5" 
                      label="Peso ideal" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#5865f2" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Registros de Peso</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Actualizar peso
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Fecha</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Peso</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Cambio</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weightHistory.slice().reverse().map((record, index) => {
                      const previousWeight = index > 0 ? weightHistory[weightHistory.length - index].weight : record.weight;
                      const change = record.weight - previousWeight;
                      
                      return (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">{record.date}</td>
                          <td className="py-3 px-4 text-gray-900 font-medium">{record.weight} kg</td>
                          <td className="py-3 px-4">
                            {change !== 0 && (
                              <div className={`flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {change > 0 ? (
                                  <TrendingUp className="h-4 w-4 mr-1" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 mr-1" />
                                )}
                                {Math.abs(change).toFixed(1)} kg
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-600">{record.notes || '-'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Treatments Tab */}
      {activeTab === 'tratamientos' && (
        <div className="space-y-6">
          {/* Current Treatments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tratamientos Actuales</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir tratamiento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {treatmentHistory.filter(t => t.status === 'activo').length > 0 ? (
                <div className="space-y-4">
                  {treatmentHistory.filter(t => t.status === 'activo').map((treatment) => (
                    <div key={treatment.id} className="border border-green-200 bg-green-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{treatment.type}</h4>
                        <Badge variant={getStatusColor(treatment.status)}>
                          {getStatusLabel(treatment.status)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-500">Inicio:</span>
                          <p className="text-gray-900">{new Date(treatment.startDate).toLocaleDateString('es-ES')}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Fin:</span>
                          <p className="text-gray-900">{new Date(treatment.endDate).toLocaleDateString('es-ES')}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Veterinario:</span>
                          <p className="text-gray-900">{treatment.veterinarian}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Dosificación:</span>
                          <p className="text-gray-900">{treatment.dosage}</p>
                        </div>
                      </div>
                      {treatment.notes && (
                        <div className="mt-3">
                          <span className="font-medium text-gray-500">Notas:</span>
                          <p className="text-gray-700 mt-1">{treatment.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No hay tratamientos activos actualmente
                </div>
              )}
            </CardContent>
          </Card>

          {/* Treatment History */}
          <Card>
            <CardHeader>
              <CardTitle>Historial de Tratamientos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treatmentHistory.map((treatment) => (
                  <div key={treatment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{treatment.type}</h4>
                      <Badge variant={getStatusColor(treatment.status)}>
                        {getStatusLabel(treatment.status)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-500">Inicio:</span>
                        <p className="text-gray-900">{new Date(treatment.startDate).toLocaleDateString('es-ES')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Fin:</span>
                        <p className="text-gray-900">{new Date(treatment.endDate).toLocaleDateString('es-ES')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Veterinario:</span>
                        <p className="text-gray-900">{treatment.veterinarian}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Dosificación:</span>
                        <p className="text-gray-900">{treatment.dosage}</p>
                      </div>
                    </div>
                    {treatment.notes && (
                      <div className="mt-3">
                        <span className="font-medium text-gray-500">Notas:</span>
                        <p className="text-gray-700 mt-1">{treatment.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Other tabs - placeholder content */}
      {(activeTab === 'visitas' || activeTab === 'comportamental') && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'visitas' ? 'Historial de Visitas' : 'Evaluación Comportamental'}
            </h3>
            <p className="text-gray-600 mb-4">
              Esta sección estará disponible próximamente.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default MedicalHistoryPage;