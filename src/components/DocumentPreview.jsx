import React from 'react';

function DocumentPreview({ type, products, clientInfo }) {
  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const date = new Date().toLocaleDateString('ru-RU');

  return (
    <div className="border p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {type === 'commercial' ? 'Коммерческое предложение' : 'Счет на оплату'}
        </h2>
        <div className="text-gray-600">№ {clientInfo.number} от {date}</div>
      </div>

      <div className="mb-6">
        <div><strong>Получатель:</strong> {clientInfo.name}</div>
        <div><strong>Проект:</strong> {clientInfo.project}</div>
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Артикул</th>
            <th className="text-left p-2">Наименование</th>
            <th className="text-right p-2">Кол-во</th>
            <th className="text-right p-2">Цена</th>
            <th className="text-right p-2">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{product.sku}</td>
              <td className="p-2">{product.name}</td>
              <td className="text-right p-2">{product.quantity}</td>
              <td className="text-right p-2">{product.price} ₸</td>
              <td className="text-right p-2">{product.price * product.quantity} ₸</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right">
        <div className="text-xl font-bold">Итого: {total} ₸</div>
      </div>

      {type === 'commercial' && (
        <div className="mt-6 text-sm text-gray-600">
          Предложение действительно в течение 3 дней с момента выдачи.
        </div>
      )}
    </div>
  );
}

export default DocumentPreview;