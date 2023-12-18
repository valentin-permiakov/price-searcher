import Product from '@/lib/models/product.model';
import connectToDB from '@/lib/mongoose';
import generateEmailBody from '@/lib/nodemailer/generateEmailBody';
import sendEmail from '@/lib/nodemailer/sendEmail';
import scrapeAmazonProduct from '@/lib/scraper/scrapeAmazonProduct';
import {
  getAveragePrice,
  getEmailNotifType,
  getHighestPrice,
  getLowestPrice,
} from '@/lib/utils';
import { User } from '@/types';
import { NextResponse } from 'next/server';

export const maxDuration = 300; //5 minutes
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    connectToDB();

    const products = await Product.find({});

    if (!products) {
      throw new Error('No Products found');
    }

    // 1. Scrape latest product details and update DB

    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) throw new Error('No product found');

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate(
          { url: product.url },
          product
        );

        // 2. Check each product status and set email accordingly

        const emailNotifType = getEmailNotifType(
          scrapedProduct,
          currentProduct
        );

        if (emailNotifType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };

          const emailContent = generateEmailBody(productInfo, emailNotifType);

          const userEmails = updatedProduct.users.map(
            (user: User) => user.email
          );

          await sendEmail(emailContent, userEmails);
        }

        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: 'Ok',
      data: updatedProducts,
    });
  } catch (error) {
    throw new Error(`Failed in GET ${error}`);
  }
}

export default GET;
