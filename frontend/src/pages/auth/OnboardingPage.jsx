import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui';

const onboardingSlides = [
  {
    id: 1,
    title: '¿Qué es RefuPet?',
    description: 'RefuPet es una plataforma integral diseñada específicamente para la gestión de refugios de animales. Nuestra solución te ayuda a administrar animales, adopciones, voluntarios y eventos desde un solo lugar.',
    icon: Heart,
    color: 'purple',
  },
  {
    id: 2,
    title: 'Mejoras con Tecnología y Colaboración',
    description: 'Optimiza tus procesos con herramientas digitales modernas. Gestiona eficientemente los registros médicos, seguimiento de adopciones y coordinación de voluntarios con nuestra plataforma intuitiva.',
    icon: Zap,
    color: 'blue',
  },
  {
    id: 3,
    title: 'Colaboración para el Bienestar Animal',
    description: 'Conecta con una comunidad dedicada al bienestar animal. Facilita el proceso de adopción, coordina actividades de voluntarios y mantén registros detallados para mejorar la vida de los animales.',
    icon: Users,
    color: 'green',
  },
];

function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % onboardingSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + onboardingSlides.length) % onboardingSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = onboardingSlides[currentSlide];
  const Icon = currentSlideData.icon;

  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-white px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-center">
              <Heart className="h-8 w-8 mr-3 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">RefuPet</h1>
            </div>
          </div>

          {/* Slide Content */}
          <div className="px-8 py-12 text-center">
            <div className="max-w-2xl mx-auto">
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 ${colorClasses[currentSlideData.color]}`}>
                <Icon className="h-10 w-10" />
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {currentSlideData.title}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {currentSlideData.description}
              </p>

              {/* Navigation */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>

                {/* Dots indicator */}
                <div className="flex space-x-2">
                  {onboardingSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide
                          ? 'bg-purple-600'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                  disabled={currentSlide === onboardingSlides.length - 1}
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-600">
                  ¿Ya tienes una cuenta?
                </p>
              </div>
              
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button variant="secondary">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button>
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;