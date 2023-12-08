'use server';

import Product from '../models/product.model';
import connectToDB from '../mongoose';

const getProductById = async (productId: string) => {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
};

export default getProductById;
