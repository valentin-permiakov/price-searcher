import React from 'react';

type TrendingProps = {};

const Trending: React.FC<TrendingProps> = () => {
  return (
    <section className='trending-section'>
      <h2 className='section-text'>Trending</h2>
      <div className='flex flex-wrap gap-x-8 g-y-16'>
        {['IPhone', 'Book'].map((product) => (
          <div key={product}>{product}</div>
        ))}
      </div>
    </section>
  );
};
export default Trending;
