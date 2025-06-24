import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, Eye } from 'lucide-react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Badge, 
  Avatar, 
  SearchInput, 
  Select 
} from '../../components/ui';
import { allAnimals, statusLabels, statusColors } from '../../constants/mockData';

function AnimalsListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter animals based on search and filters
  const filteredAnimals = useMemo(() => {
    return allAnimals.filter(animal => {
      const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           animal.breed.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecies = !speciesFilter || animal.species === speciesFilter;
      const matchesStatus = !statusFilter || animal.status === statusFilter;
      const matchesAge = !ageFilter || 
        (ageFilter === 'young' && animal.ageMonths <= 12) ||
        (ageFilter === 'adult' && animal.ageMonths > 12 && animal.ageMonths <= 84) ||
        (ageFilter === 'senior' && animal.ageMonths > 84);

      return matchesSearch && matchesSpecies && matchesStatus && matchesAge;
    });
  }, [searchTerm, speciesFilter, statusFilter, ageFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAnimals = filteredAnimals.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => {
    setSearchTerm('');
    setSpeciesFilter('');
    setStatusFilter('');
    setAgeFilter('');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || speciesFilter || statusFilter || ageFilter;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Animales</h1>
          <p className="text-gray-600 mt-1">
            Gestiona la información de todos los animales del refugio
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Animal
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <SearchInput
                placeholder="Buscar por nombre o raza..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClear={() => setSearchTerm('')}
              />
            </div>

            {/* Species Filter */}
            <Select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              placeholder="Especie"
            >
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </Select>

            {/* Age Filter */}
            <Select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              placeholder="Edad"
            >
              <option value="young">Joven (≤ 1 año)</option>
              <option value="adult">Adulto (1-7 años)</option>
              <option value="senior">Senior (&gt; 7 años)</option>
            </Select>

            {/* Status Filter */}
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              placeholder="Estado"
            >
              <option value="disponible">Disponible</option>
              <option value="en-adopcion">En adopción</option>
              <option value="tratamiento">Tratamiento</option>
              <option value="temporal">Temporal</option>
            </Select>
          </div>

          {/* Filter Actions */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {filteredAnimals.length} resultado{filteredAnimals.length !== 1 ? 's' : ''} encontrado{filteredAnimals.length !== 1 ? 's' : ''}
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedAnimals.map((animal) => (
          <Card key={animal.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Avatar
                  fallback={animal.avatar}
                  size="lg"
                  color={animal.color}
                />
                <Badge variant={statusColors[animal.status]}>
                  {statusLabels[animal.status]}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-gray-900">
                  {animal.name}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Especie:</span> {animal.species}</p>
                  <p><span className="font-medium">Raza:</span> {animal.breed}</p>
                  <p><span className="font-medium">Edad:</span> {animal.age}</p>
                  <p><span className="font-medium">Género:</span> {animal.gender}</p>
                  <p><span className="font-medium">Tamaño:</span> {animal.size}</p>
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  Ingreso: {new Date(animal.entryDate).toLocaleDateString('es-ES')}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link to={`/animals/${animal.id}`} className="w-full">
                  <Button variant="ghost" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver detalles
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAnimals.length)} de {filteredAnimals.length} animales
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {filteredAnimals.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron animales
            </h3>
            <p className="text-gray-600 mb-4">
              No hay animales que coincidan con los filtros seleccionados.
            </p>
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AnimalsListPage;