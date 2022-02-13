import { useEffect, useState } from 'react';
import Link from 'next/link';

type Props = {
  readonly text: string;
  readonly link: string;
  readonly linkLabel: string;
  readonly initialIsOpen?: boolean;
};

const headBannerClosedKey = 'nf-head-banner-closed';

export const HeaderBanner = ({ link, linkLabel, text, initialIsOpen }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isClosed = localStorage.getItem(headBannerClosedKey);
    if (isClosed === null) {
      setIsOpen(initialIsOpen === undefined ? true : initialIsOpen);
      return;
    }

    setIsOpen(false);
  }, [initialIsOpen]);

  const close = () => {
    setIsOpen(false);
    localStorage.setItem(headBannerClosedKey, '1');
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="flex flex-wrap sm:flex-nowrap sm:justify-center sm:items-center bg-indigo-500 relative sm:gap-3 px-4 sm:pr-8 ms:px-8 py-3">
        <div className="order-1 sm:order-none w-11/12 sm:w-auto max-w-screen-sm inline-block text-white text-sm md:text-base mb-2 sm:mb-0">
          {text}
        </div>

        <Link href={link}>
          <a className="order-last sm:order-none w-full sm:w-auto inline-block bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:ring ring-indigo-300 text-white text-xs md:text-sm font-semibold text-center whitespace-nowrap rounded-lg outline-none transition duration-100 px-4 py-2">
            {linkLabel}
          </a>
        </Link>

        <div className="order-2 sm:order-none w-1/12 sm:w-auto flex justify-end items-start sm:absolute sm:right-0 sm:mr-1 xl:mr-3">
          <button
            type="button"
            className="text-white hover:text-indigo-100 active:text-indigo-200 transition duration-100"
            onClick={close}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 md:w-6 h-5 md:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
