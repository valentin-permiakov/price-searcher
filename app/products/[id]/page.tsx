import ProductCard from '@/components/ProductCard';
import Modal from '@/components/ProductPage/Modal';
import PriceInfoCard from '@/components/ProductPage/PriceInfoCard';
import ProductDescription from '@/components/ProductPage/ProductDescription';
import ProductHeader from '@/components/ProductPage/ProductHeader';
import ProductStats from '@/components/ProductPage/ProductStats';
import getProductById from '@/lib/actions/getProductById';
import getSimilarProducts from '@/lib/actions/getSimilarProducts';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

type ProductDetailsProps = {
  params: { id: string };
};

const ProductDetails: React.FC<ProductDetailsProps> = async ({
  params: { id },
}) => {
  const product = await getProductById(id);
  if (!product) redirect('/');
  const similarProducts = await getSimilarProducts(id);
  return (
    <div className='product-container'>
      <div className='flex gap-28 xl:flex-row flex-col'>
        <div className='product-image'>
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className='mx-auto'
          />
        </div>

        <div className='flex-1 flex flex-col'>
          <ProductHeader
            title={product.title}
            url={product.url}
            reviewsCount={product.reviewsCount}
          />
          <ProductStats
            currency={product.currency}
            currentPrice={product.currentPrice}
            originalPrice={product.originalPrice}
            stars={product.stars}
            reviewsCount={product.reviewsCount}
          />
          <div className='my-7 flex flex-col gap-5'>
            <div className='flex gap-5 flex-wrap'>
              <PriceInfoCard
                title='Current Price'
                iconSrc='/assets/icons/price-tag.svg'
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
              />
              <PriceInfoCard
                title='Average Price'
                iconSrc='/assets/icons/chart.svg'
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
              />
              <PriceInfoCard
                title='Highest Price'
                iconSrc='/assets/icons/arrow-up.svg'
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
              />
              <PriceInfoCard
                title='Lowest Price'
                iconSrc='/assets/icons/arrow-down.svg'
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
              />
            </div>
          </div>
          <Modal productId={id} />
        </div>
      </div>

      <ProductDescription
        description={product.description}
        url={product.url}
      />

      {similarProducts && similarProducts?.length > 0 && (
        <div className='py-14 flex flex-col gap-2 w-full'>
          <p className='section-text'>Similar Products</p>
          <div className='flex flex-wrap gap-10 mt-7 w-full'>
            {similarProducts.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
