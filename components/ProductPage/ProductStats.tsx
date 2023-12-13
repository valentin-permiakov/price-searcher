import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

type ProductStatsProps = {
  currency: string;
  currentPrice: number;
  originalPrice: number;
  stars: number;
  reviewsCount: number;
};

const ProductStats: React.FC<ProductStatsProps> = ({
  currency,
  currentPrice,
  originalPrice,
  stars,
  reviewsCount,
}) => {
  return (
    <div className='product-info'>
      <div className='flex flex-col gap-2'>
        <p className='text-[34px] text-secondary font-bold'>
          {currency} {formatNumber(currentPrice)}
        </p>
        <p className='text-[21px] text-black opacity-50 line-through'>
          {currency} {formatNumber(originalPrice)}
        </p>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-3'>
          <div className='product-stars'>
            <Image
              src='/assets/icons/star.svg'
              alt='star'
              width={16}
              height={16}
            />
            <p className='text-sm  text-primary-orange font-semibold'>
              {stars || 25}
            </p>
          </div>
          <div className='product-reviews'>
            <Image
              src='/assets/icons/comment.svg'
              alt='comment'
              width={16}
              height={16}
            />
            <p className='text-sm text-secondary font-semibold'>
              {reviewsCount || 25} reviews
            </p>
          </div>
        </div>
        <p className='text-sm text-black opacity-50'>
          <span className='text-primary-green font-semibold'>93% </span> of
          buyers have recommended this.
        </p>
      </div>
    </div>
  );
};
export default ProductStats;
