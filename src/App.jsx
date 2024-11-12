import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ProductSearch from './components/ProductSearch';
import ProductList from './components/ProductList';
import DocumentPreview from './components/DocumentPreview';
import { generatePDF } from './utils/pdfGenerator';

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [documentType, setDocumentType] = useState('commercial');
  const [clientInfo, setClientInfo] = useState({
    name: '',
    project: '',
    number: ''
  });

  const { data: products, isLoading, error } = useQuery('products', 
    async () => {
      try {
        const response = await axios.get('https://beoplz.online/update_price/products_api.php');
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    },
    {
      retry: 3,
      initialData: [],
      refetchOnWindowFocus: false,
    }
  );

  const handleProductSelect = (product) => {
    setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
  };

  const handleProductRemove = (index) => {
    const newProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(newProducts);
  };

  const handleQuantityChange = (index, quantity) => {
    const newProducts = [...selectedProducts];
    newProducts[index].quantity = quantity;
    setSelectedProducts(newProducts);
  };

  const handleGeneratePDF = () => {
    generatePDF(documentType, selectedProducts, clientInfo);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-red-600 text-xl font-semibold mb-2">Ошибка загрузки данных</h2>
          <p className="text-gray-600">Пожалуйста, попробуйте обновить страницу</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Обновить страницу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Создание документов</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Информация о клиенте</h2>
              <input
                type="text"
                placeholder="Имя клиента"
                className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
              />
              <input
                type="text"
                placeholder="Название проекта"
                className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={clientInfo.project}
                onChange={(e) => setClientInfo({...clientInfo, project: e.target.value})}
              />
              <input
                type="text"
                placeholder="Номер документа"
                className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={clientInfo.number}
                onChange={(e) => setClientInfo({...clientInfo, number: e.target.value})}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Поиск продуктов</h2>
              <ProductSearch products={products} onSelect={handleProductSelect} isLoading={isLoading} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Выбранные продукты</h2>
              <ProductList
                products={selectedProducts}
                onRemove={handleProductRemove}
                onQuantityChange={handleQuantityChange}
              />
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Предпросмотр</h2>
                <div className="space-x-4">
                  <button
                    onClick={() => setDocumentType('commercial')}
                    className={`px-4 py-2 rounded transition-colors ${
                      documentType === 'commercial' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Коммерческое предложение
                  </button>
                  <button
                    onClick={() => setDocumentType('invoice')}
                    className={`px-4 py-2 rounded transition-colors ${
                      documentType === 'invoice' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Счет на оплату
                  </button>
                </div>
              </div>
              <DocumentPreview
                type={documentType}
                products={selectedProducts}
                clientInfo={clientInfo}
              />
              <button
                onClick={handleGeneratePDF}
                className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
              >
                Скачать PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;