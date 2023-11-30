'use client';
import scrapeAmazonProduct from '@/lib/scraper/scrapeAmazonProduct';
import React, { FormEvent, useState } from 'react';

type SearchBarProps = {};

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    // check if hostname contains amazon.*
    if (hostname.includes('amazon.')) {
      return true;
    } else {
      false;
    }
  } catch (error) {
    return false;
  }
};

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) {
      return alert(
        'Please provide a valid amazon link starting with https://amazon.*'
      );
    }

    try {
      setIsLoading(true);

      // scrape the product
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className='flex flex-wrap gap-4 mt-12'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder='Enter product link'
        className='searchbar-input'
      />
      <button
        type='submit'
        className='searchbar-btn'
        disabled={searchPrompt === ''}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};
export default SearchBar;
