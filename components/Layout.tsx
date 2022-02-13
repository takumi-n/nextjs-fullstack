import type { ReactNode } from 'react';
import { Header } from './Header';
import { HeaderBanner } from './HeaderBanner';

type LayoutProps = {
  readonly children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <>
    <HeaderBanner text="New version has been released!" link="/" linkLabel="Check" />
    <Header />
    <main className="h-full w-full bg-white py-16 px-4 flex flex-col items-center justify-center">
      {children}
    </main>
  </>
);
