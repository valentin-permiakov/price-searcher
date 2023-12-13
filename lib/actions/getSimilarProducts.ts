import { ProductType } from '@/types';
import Product from '../models/product.model';
import connectToDB from '../mongoose';

const getSimilarProducts = async (
  productId: string
): Promise<ProductType[] | undefined | null> => {
  try {
    connectToDB();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;

    const similarPrducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarPrducts;
  } catch (error) {
    console.log(error);
  }
};

export default getSimilarProducts;
