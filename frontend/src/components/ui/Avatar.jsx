import React from 'react';
import { cn } from '../../utils/cn';

const Avatar = React.forwardRef(({
  className,
  size = 'default',
  src,
  alt,
  fallback,
  color = 'purple',
  ...props
}, ref) => {
  const sizes = {
    sm: 'h-8 w-8 text-sm',
    default: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl',
  };

  const colors = {
    purple: 'bg-purple-600 text-white',
    green: 'bg-green-500 text-white',
    orange: 'bg-orange-500 text-white',
    red: 'bg-red-500 text-white',
    gray: 'bg-gray-500 text-white',
  };

  if (src) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(
          'rounded-full object-cover',
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center rounded-full font-medium',
        sizes[size],
        colors[color],
        className
      )}
      {...props}
    >
      {fallback}
    </div>
  );
});
Avatar.displayName = 'Avatar';

export default Avatar;