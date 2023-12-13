'use server';

import { ProductType } from '@/types';
import Product from '../models/product.model';
import connectToDB from '../mongoose';

type GetProductByIdType = (
  productId: string
) => Promise<ProductType | null | undefined>;

const getProductById: GetProductByIdType = async (productId) => {
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
