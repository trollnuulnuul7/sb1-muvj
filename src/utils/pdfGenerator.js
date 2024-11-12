import html2pdf from 'html2pdf.js';

export const generatePDF = (type, products, clientInfo) => {
  const element = document.createElement('div');
  element.innerHTML = generateHTML(type, products, clientInfo);
  
  const opt = {
    margin: 1,
    filename: `${type === 'commercial' ? 'commercial_offer' : 'invoice'}_${clientInfo.number}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(element).set(opt).save();
};

const generateHTML = (type, products, clientInfo) => {
  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const date = new Date().toLocaleDateString('ru-RU');

  return `
    <div style="font-family: Arial, sans-serif; padding: 40px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; margin-bottom: 10px;">
          ${type === 'commercial' ? 'Коммерческое предложение' : 'Счет на оплату'}
        </h1>
        <div>№ ${clientInfo.number} от ${date}</div>
      </div>

      <div style="margin-bottom: 30px;">
        <div><strong>Получатель:</strong> ${clientInfo.name}</div>
        <div><strong>Проект:</strong> ${clientInfo.project}</div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr style="border-bottom: 1px solid #000;">
            <th style="text-align: left; padding: 8px;">Артикул</th>
            <th style="text-align: left; padding: 8px;">Наименование</th>
            <th style="text-align: right; padding: 8px;">Кол-во</th>
            <th style="text-align: right; padding: 8px;">Цена</th>
            <th style="text-align: right; padding: 8px;">Сумма</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(product => `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px;">${product.sku}</td>
              <td style="padding: 8px;">${product.name}</td>
              <td style="text-align: right; padding: 8px;">${product.quantity}</td>
              <td style="text-align: right; padding: 8px;">${product.price} ₸</td>
              <td style="text-align: right; padding: 8px;">${product.price * product.quantity} ₸</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="text-align: right; margin-bottom: 30px;">
        <div style="font-size: 18px; font-weight: bold;">
          Итого: ${total} ₸
        </div>
      </div>

      ${type === 'commercial' ? `
        <div style="color: #666; font-size: 12px;">
          Предложение действительно в течение 3 дней с момента выдачи.
        </div>
      ` : ''}
    </div>
  `;
};