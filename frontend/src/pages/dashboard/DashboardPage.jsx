import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, Eye, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Avatar } from '../../components/ui';
import { dashboardMetrics, recentAnimals, upcomingEvents, statusLabels, statusColors, eventTypeColors, eventTypeLabels } from '../../constants/mockData';

function MetricCard({ title, value, change, trend, icon: Icon }) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendText = () => {
    if (trend === 'up') return `↑${change}% este mes`;
    if (trend === 'down') return `↓${change}% este mes`;
    return 'igual que el mes pasado';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          {Icon && (
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Icon className="h-4 w-4 text-purple-600" />
            </div>
          )}
        </div>
        <div className={`flex items-center mt-2 text-sm ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="ml-1">{getTrendText()}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Animales"
          value={dashboardMetrics.totalAnimals.value}
          change={dashboardMetrics.totalAnimals.change}
          trend={dashboardMetrics.totalAnimals.trend}
        />
        <MetricCard
          title="Adopciones"
          value={dashboardMetrics.adoptions.value}
          change={dashboardMetrics.adoptions.change}
          trend={dashboardMetrics.adoptions.trend}
        />
        <MetricCard
          title="Voluntarios"
          value={dashboardMetrics.volunteers.value}
          change={dashboardMetrics.volunteers.change}
          trend={dashboardMetrics.volunteers.trend}
        />
        <MetricCard
          title="Eventos"
          value={dashboardMetrics.events.value}
          change={dashboardMetrics.events.change}
          trend={dashboardMetrics.events.trend}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Animals Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Animales Recientes</CardTitle>
                <Link to="/animals">
                  <Button variant="ghost" size="sm">
                    Ver todos
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Nombre</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Especie</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Edad</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Fecha de ingreso</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Estado</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAnimals.map((animal) => (
                      <tr key={animal.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar
                              fallback={animal.avatar}
                              size="sm"
                              color={animal.color}
                            />
                            <span className="ml-3 font-medium text-gray-900">
                              {animal.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{animal.species}</td>
                        <td className="py-3 px-4 text-gray-600">{animal.age}</td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(animal.entryDate).toLocaleDateString('es-ES')}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={statusColors[animal.status]}>
                            {statusLabels[animal.status]}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Link to={`/animals/${animal.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Ver detalles
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Mostrando 5 de 127 animales
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="ghost" size="sm">
                    Siguiente
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Próximos Eventos</CardTitle>
                <Link to="/calendar">
                  <Button variant="ghost" size="sm">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <div className="flex-shrink-0">
                      <Badge variant={eventTypeColors[event.type]}>
                        {eventTypeLabels[event.type]}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString('es-ES')} • {event.time}
                      </p>
                      <p className="text-xs text-gray-500">
                        {event.participants} participante{event.participants !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link to="/calendar">
                  <Button variant="ghost" size="sm" className="w-full">
                    Ver todos los eventos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;