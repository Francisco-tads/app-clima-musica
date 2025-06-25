import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
  onLocationRequest: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading, onLocationRequest }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar cidade..."
            className="w-full pl-12 pr-16 py-4 bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
          />
          <button
            type="button"
            onClick={onLocationRequest}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white/80"
            title="Usar minha localização"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <MapPin className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};