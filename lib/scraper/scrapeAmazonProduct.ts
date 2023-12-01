import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractPrice } from '../utils';

const scrapeAmazonProduct = async (url: string) => {
  if (!url) return;

  const username = String(process.env.NEXT_PUBLIC_BRIGHT_DATA_USERNAME);
  const password = String(process.env.NEXT_PUBLIC_BRIGHT_DATA_PASSWORD);

  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch the product page

    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // Extract product data

    const title = $('#productTitle').text().trim();
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('a.size.base.a-color-price'),
      // $('.a-button-selected .a-color-base'),
      // $('#price'),
      // $('.a-price.a-text-price'),
      $('.apexPriceToPay .a-offscreen'),
      $('a-price.aok-align-center .a-offscreen')
    );

    const originalPrice = extractPrice(
      $('span.a-offscreen:first'),
      $('#priceblock_ourprice'),
      $('#listPrice'),
      $('.basisPrice span.a-offscreen'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );

    const outOfStock =
      $('#availability span').text().trim().toLowerCase() ===
      'currently out of stock';

    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';

    const imgURLs = Object.keys(JSON.parse(images));

    const currency = extractCurrency($('.a-price-symbol'));

    const discountRate = $('span.savingsPercentage').text();

    console.log({
      title,
      currentPrice,
      originalPrice,
      outOfStock,
      imgURLs,
      currency,
      discountRate,
    });
  } catch (error: any) {
    throw new Error(`Failed to scrape data: ${error.message}`);
  }
};
export default scrapeAmazonProduct;
