import { ProductType } from '@/types';
import Product from '../models/product.model';
import connectToDB from '../mongoose';

const getAllProducts = async (): Promise<ProductType[] | undefined> => {
  try {
    connectToDB();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
};

export default getAllProducts;
