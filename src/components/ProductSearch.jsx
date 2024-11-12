import React, { useState, useCallback } from 'react';
import { useDebounce } from '../hooks/useDebounce';

function ProductSearch({ products, onSelect, isLoading }) {
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const filteredProducts = useCallback(() => {
    if (!debouncedSearch || !products) return [];
    
    return products.filter(product => 
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      product.sku.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, products]);

  const handleSelect = (product) => {
    onSelect(product);
    setSearch('');
    setShowResults(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Поиск по названию или артикулу..."
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      
      {showResults && search && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredProducts().map(product => (
            <div
              key={product.sku}
              className="p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-b-0"
              onClick={() => handleSelect(product)}
            >
              <div className="font-semibold text-gray-800">{product.name}</div>
              <div className="text-sm text-gray-600">Артикул: {product.sku}</div>
              <div className="text-sm font-medium text-blue-600">Цена: {product.price} ₸</div>
            </div>
          ))}
          {filteredProducts().length === 0 && (
            <div className="p-3 text-gray-500 text-center">
              {isLoading ? 'Загрузка...' : 'Ничего не найдено'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductSearch;