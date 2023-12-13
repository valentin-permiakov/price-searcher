import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ProductHeaderProps = {
  title: string;
  url: string;
  reviewsCount: number;
};

const ProductHeader: React.FC<ProductHeaderProps> = ({
  title,
  url,
  reviewsCount,
}) => {
  return (
    <>
      <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
        <div className='flex flex-col gap-3'>
          <h3 className='text-[28px] text-secondary font-semibold'>{title}</h3>
        </div>
        <Link
          href={url}
          target='_blank'
          className='text-base text-black opacity-50'
        >
          Visit Product
        </Link>
      </div>

      <div className='flex items-center gap-3 py-5'>
        <div className='product-hearts'>
          <Image
            src='/assets/icons/red-heart.svg'
            alt='red heart'
            width={20}
            height={20}
          />
          <p className='text-base font-semibold text-[#D46F77]'>
            {reviewsCount || 25}
          </p>
        </div>
        <div className='p-2 bg-white-200 rounded-10'>
          <Image
            src='/assets/icons/bookmark.svg'
            alt='bookmark'
            width={20}
            height={20}
          />
        </div>
        <div className='p-2 bg-white-200 rounded-10'>
          <Image
            src='/assets/icons/share.svg'
            alt='share'
            width={20}
            height={20}
          />
        </div>
      </div>
    </>
  );
};
export default ProductHeader;
