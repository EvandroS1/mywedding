export default function formatValue(value: number | string) {
  let numericValue: number;

  if (typeof value === 'string') {
    // Remove qualquer símbolo não numérico, exceto dígitos, vírgula e ponto
    const cleaned = value.replace(/[^0-9.,-]/g, '').replace(',', '.');
    numericValue = parseFloat(cleaned);

    if (isNaN(numericValue)) {
      throw new Error(`Valor inválido: ${value}`);
    }
  } else {
    numericValue = value;
  }

  const hasCents = numericValue % 1 !== 0;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(numericValue);
}
