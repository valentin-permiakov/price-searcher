import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ProductDescriptionProps = {
  description?: string;
  url?: string;
};

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
  url,
}) => {
  return (
    <div className='flex flex-col gap-16'>
      <div className='flex flex-col gap-5'>
        <h3 className='text-2xl text-secondary font-semibold'>
          Product Description
        </h3>

        <div className='flex flex-col gap-4'>{description?.split('\n')}</div>
      </div>
      <Link
        href={url || '/'}
        className='text-base text-white'
      >
        <button className='btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]'>
          <Image
            src='/assets/icons/bag.svg'
            alt='bag'
            width={22}
            height={22}
          />
          Buy Now
        </button>
      </Link>
    </div>
  );
};
export default ProductDescription;
