import axios from 'axios';

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

    const response = axios.get(url, options);
  } catch (error: any) {
    throw new Error(`Failed to scrape data: ${error.message}`);
  }
};
export default scrapeAmazonProduct;
