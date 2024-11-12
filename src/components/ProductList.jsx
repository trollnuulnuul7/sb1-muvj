import React from 'react';

function ProductList({ products, onRemove, onQuantityChange }) {
  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div 
          key={`${product.sku}-${index}`} 
          className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex-1 min-w-0 mr-4">
            <div className="font-semibold text-gray-800 truncate">{product.name}</div>
            <div className="text-sm text-gray-600">Артикул: {product.sku}</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor={`quantity-${index}`} className="sr-only">Количество</label>
              <input
                id={`quantity-${index}`}
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) => onQuantityChange(index, Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-24 text-right font-medium text-gray-900">
              {product.price * product.quantity} ₸
            </div>
            <button
              onClick={() => onRemove(index)}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Удалить продукт"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      
      {products.length > 0 ? (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-right text-xl font-bold text-gray-900">
            Итого: {total} ₸
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
          Список пуст
        </div>
      )}
    </div>
  );
}

export default ProductList;