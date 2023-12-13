import Hero from '@/components/Hero/Hero';
import Trending from '@/components/Trending';
import getAllProducts from '@/lib/actions/getAllProducts';
import Image from 'next/image';
import React from 'react';

type HomeProps = {};

const Home: React.FC<HomeProps> = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <Hero />
      {allProducts && <Trending products={allProducts} />}
    </>
  );
};
export default Home;
