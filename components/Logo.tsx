import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => (
  <div className="flex justify-start lg:w-0 lg:flex-1">
    <Link href="/">
      <a>
        <Image
          className="h-24 w-auto sm:h-10 bg-violet-700"
          src="/logo.svg"
          alt="logo"
          width={40}
          height={44}
        />
      </a>
    </Link>
  </div>
);
