import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Camera, 
  Heart, 
  Calendar, 
  Weight, 
  Share2,
  Edit,
  Activity,
  FileText
} from 'lucide-react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Badge, 
  Avatar 
} from '../../components/ui';
import { allAnimals, statusLabels, statusColors } from '../../constants/mockData';

function AnimalDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = allAnimals.find(a => a.id === parseInt(id));

  if (!animal) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Animal no encontrado</h1>
          <Link to="/animals">
            <Button>Volver a la lista</Button>
          </Link>
        </div>
      </div>
    );
  }

  const characteristics = [
    { label: 'Chip', value: true },
    { label: 'Vacunas', value: true },
    { label: 'Castrado', value: animal.ageMonths > 6 }
  ];

  const healthInfo = {
    entryWeight: animal.weight - 2,
    currentWeight: animal.weight,
    idealWeight: animal.species === 'Perro' ? animal.weight + 1 : animal.weight + 0.5,
    healthProblems: animal.status === 'tratamiento' ? ['Dermatitis leve'] : []
  };

  const photos = [
    { id: 1, url: null, isMain: true },
    { id: 2, url: null, isMain: false },
    { id: 3, url: null, isMain: false },
    { id: 4, url: null, isMain: false }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/animals')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {animal.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Detalles completos del animal
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir perfil
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <Avatar
                  fallback={animal.avatar}
                  size="2xl"
                  color={animal.color}
                />
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Nombre</label>
                    <p className="text-lg font-semibold text-gray-900">{animal.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Estado</label>
                    <div className="mt-1">
                      <Badge variant={statusColors[animal.status]}>
                        {statusLabels[animal.status]}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Especie</label>
                    <p className="text-gray-900">{animal.species}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Raza</label>
                    <p className="text-gray-900">{animal.breed}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Edad</label>
                    <p className="text-gray-900">{animal.age}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Género</label>
                    <p className="text-gray-900">{animal.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tamaño</label>
                    <p className="text-gray-900">{animal.size}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Peso</label>
                    <p className="text-gray-900">{animal.weight} kg</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {animal.name} es un {animal.species.toLowerCase()} muy cariñoso y sociable. 
                Le encanta jugar y está bien socializado con otros animales. 
                Es ideal para familias que buscan una mascota activa y amorosa.
                {animal.status === 'tratamiento' && ' Actualmente está recibiendo tratamiento médico y se recupera favorablemente.'}
              </p>
            </CardContent>
          </Card>

          {/* Health Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Información de Salud
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Fecha de ingreso</label>
                  <p className="text-gray-900">{new Date(animal.entryDate).toLocaleDateString('es-ES')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Peso al ingreso</label>
                  <p className="text-gray-900">{healthInfo.entryWeight} kg</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Peso actual</label>
                  <p className="text-gray-900">{healthInfo.currentWeight} kg</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Peso ideal</label>
                  <p className="text-gray-900">{healthInfo.idealWeight} kg</p>
                </div>
              </div>

              {healthInfo.healthProblems.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-2">Problemas de salud</label>
                  <div className="space-y-2">
                    {healthInfo.healthProblems.map((problem, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="text-gray-700">{problem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Characteristics */}
          <Card>
            <CardHeader>
              <CardTitle>Características</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {characteristics.map((char, index) => (
                  <Badge 
                    key={index} 
                    variant={char.value ? 'success' : 'default'}
                  >
                    {char.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button className="flex-1">
              <Heart className="h-4 w-4 mr-2" />
              Proceso de Adopción
            </Button>
            <Link to={`/animals/${animal.id}/medical`} className="flex-1">
              <Button variant="secondary" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Historial Médico
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column - Photos */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Fotos</span>
                <Button size="sm" variant="ghost">
                  <Camera className="h-4 w-4 mr-2" />
                  Añadir foto
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {photos.map((photo) => (
                  <div 
                    key={photo.id} 
                    className={`aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer ${
                      photo.isMain ? 'col-span-2' : ''
                    }`}
                  >
                    {photo.url ? (
                      <img 
                        src={photo.url} 
                        alt={`${animal.name} - ${photo.id}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">
                          {photo.isMain ? 'Foto principal' : 'Añadir foto'}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Weight className="h-4 w-4 mr-2" />
                Actualizar peso
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Programar cita
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Añadir nota
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AnimalDetailsPage;