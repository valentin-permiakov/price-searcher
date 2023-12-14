'use server';
import { User } from '@/types';
import Product from '../models/product.model';
import generateEmailBody from '../nodemailer/generateEmailBody';
import sendEmail from '../nodemailer/sendEmail';
import connectToDB from '../mongoose';

const addUserEmailToProduct = async (productId: string, userEmail: string) => {
  try {
    // send first email
    const product = await Product.findById(productId);

    if (!product) return;

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    );

    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = generateEmailBody(product, 'WELCOME');

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
};

export default addUserEmailToProduct;
