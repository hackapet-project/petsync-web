// RefuPet Brand Colors based on design system
export const colors = {
  primary: {
    purple: '#5865f2',
    purpleLight: '#e0e7ff',
    purpleUltraLight: '#f0f4ff',
  },
  status: {
    green: '#10b981',
    orange: '#f59e0b', 
    red: '#ef4444',
    yellow: '#eab308',
  },
  neutral: {
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
  },
  white: '#ffffff',
  black: '#000000',
};

// Status colors for animals and processes
export const statusColors = {
  disponible: colors.status.green,
  'en-tratamiento': colors.status.red,
  'en-adopcion': colors.primary.purple,
  temporal: colors.status.orange,
  completado: colors.neutral.gray400,
  activo: colors.status.green,
  inactivo: colors.neutral.gray400,
};

export default colors;