import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const SearchInput = React.forwardRef(({
  className,
  value,
  onChange,
  onClear,
  placeholder = 'Buscar...',
  ...props
}, ref) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-10 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});
SearchInput.displayName = 'SearchInput';

export default SearchInput;