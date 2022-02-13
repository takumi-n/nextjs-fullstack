import { useAuth } from '@/features/auth/hooks/useAuth';
import { Logo } from './Logo';
import Image from 'next/image';
import { Popover } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { useState } from 'react';

export const Header = () => {
  const { session, signOut } = useAuth();

  // https://headlessui.dev/react/popover#positioning-the-panel
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
  });

  return (
    <header className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <Logo />
          {session && session?.user?.image && (
            <Popover>
              <Popover.Button ref={setReferenceElement}>
                <Image
                  src={session.user.image}
                  className="rounded-full"
                  alt=""
                  width="50"
                  height="50"
                />
              </Popover.Button>

              <Popover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                <div className="flex flex-col bg-white border border-gray-300 rounded-md px-4 py-2">
                  <a
                    className="whitespace-nowrap"
                    onClick={() => signOut()}
                    onKeyDown={() => signOut()}
                    role="button"
                    tabIndex={-1}
                  >
                    Sign Out
                  </a>
                </div>
              </Popover.Panel>
            </Popover>
          )}
        </nav>
      </div>
    </header>
  );
};
