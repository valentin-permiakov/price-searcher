import { ProductType } from '@/types';
import React from 'react';
import ProductCard from './ProductCard';

type TrendingProps = {
  products: ProductType[];
};

const Trending: React.FC<TrendingProps> = ({ products }) => {
  return (
    <section className='trending-section'>
      <h2 className='section-text'>Trending</h2>
      <div className='flex flex-wrap gap-x-8 g-y-16'>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
export default Trending;
