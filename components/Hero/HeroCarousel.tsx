'use client';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

type HeroCarouselProps = {};

const heroImgs = [
  { url: '/assets/images/hero-1.svg', alt: 'smart watch' },
  { url: '/assets/images/hero-2.svg', alt: 'bag' },
  { url: '/assets/images/hero-3.svg', alt: 'lamp' },
  { url: '/assets/images/hero-4.svg', alt: 'air fryer' },
  { url: '/assets/images/hero-5.svg', alt: 'chair' },
];

const HeroCarousel: React.FC<HeroCarouselProps> = () => {
  return (
    <div className='hero-carousel'>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showArrows={false}
        showStatus={false}
      >
        {heroImgs.map((img) => (
          <Image
            key={img.alt}
            src={img.url}
            alt={img.alt}
            width={480}
            height={480}
            className='object-contain'
          />
        ))}
      </Carousel>
      <Image
        src='/assets/icons/hand-drawn-arrow.svg'
        alt='hand drawn arrow left'
        width={175}
        height={175}
        className='max-xl:hidden absolute -left-[15%] bottom-0 z-0'
      />
    </div>
  );
};
export default HeroCarousel;
