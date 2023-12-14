'use client';

import addUserEmailToProduct from '@/lib/actions/addUserEmailToProduct';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import React, { FormEvent, Fragment, useState } from 'react';

type ModalProps = {
  productId: string;
};

const Modal: React.FC<ModalProps> = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addUserEmailToProduct(productId, email);

    setIsSubmitting(false);
    setEmail('');
    setIsOpen(false);
  };

  return (
    <>
      <button
        className='btn'
        onClick={() => setIsOpen(true)}
      >
        Track
      </button>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as='div'
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className='dialog-container'
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            />

            <Transition.Child
              as={Fragment}
              enter='ease-out duration-400'
              enterFrom='opacity-0 scale-85'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-400'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-85'
            >
              <div className='dialog-content'>
                <div className='flex flex-col'>
                  <div className='flex justify-between'>
                    <div className='p-3 ounded-10'>
                      <Image
                        src='/assets/icons/logo.svg'
                        alt='logo'
                        width={28}
                        height={28}
                      />
                    </div>
                    <Image
                      src='/assets/icons/x-close.svg'
                      alt='close'
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                  <h4 className='dialog-head_text'>
                    Stay updated with product pricing alerts right in your
                    inbox!
                  </h4>
                  <p className='text-sm text-gray-600 mt-2'>
                    Never miss a bargain again with our timely alerts!
                  </p>
                </div>
                <form
                  className='flex flex-col mt-5'
                  onSubmit={handleSubmit}
                >
                  <label
                    htmlFor='email'
                    className='text-sm font-medium text-gray-700'
                  >
                    Email address
                  </label>
                  <div className='dialog-input_container'>
                    <Image
                      src='/assets/icons/mail.svg'
                      alt='mail'
                      width={18}
                      height={18}
                    />
                    <input
                      type='email'
                      name='email'
                      id='email'
                      required
                      placeholder='Enter your email address'
                      className='dialog-input'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    type='submit'
                    className='dialog-btn'
                  >
                    {isSubmitting ? 'Submitting...' : 'Track'}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Modal;
