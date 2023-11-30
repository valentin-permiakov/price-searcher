import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type NavbarProps = {};

const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'black heart' },
  { src: '/assets/icons/user.svg', alt: 'user' },
];

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className='w-full'>
      <nav className='nav'>
        <Link
          href='/'
          className='flex items-center gap-1'
        >
          <Image
            src='/assets/icons/logo.svg'
            alt='app logo'
            width={27}
            height={27}
          />
          <p className='nav-logo'>
            Price<span className='text-primary'>Search</span>
          </p>
        </Link>
        <div className='flex items-center gap-5'>
          {navIcons.map((icon) => (
            <Image
              src={icon.src}
              alt={icon.alt}
              key={icon.alt}
              width={28}
              height={28}
              className='object-contain'
            />
          ))}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
