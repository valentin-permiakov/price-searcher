import { AnyNode, Cheerio } from 'cheerio';

export const extractPrice = (...elements: Cheerio<AnyNode>[]) => {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      return priceText.replace(/[^0-9.]/g, '');
    }
  }

  return '';
};

export const extractCurrency = (element: Cheerio<AnyNode>) => {
  const currencyText = element.text().trim().slice(0, 1);

  return currencyText ? currencyText : '';
};
