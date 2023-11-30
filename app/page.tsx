import Hero from '@/components/Hero/Hero';
import Trending from '@/components/Trending';
import Image from 'next/image';
import React from 'react';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Hero />
      <Trending />
    </>
  );
};
export default Home;
