'use client';
import { NavLink } from './NavLink';
import { useCallback, useState } from 'react';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react'

const navbarItems = [
  { ref: '/', label: 'HOME' },
  { ref: '/events', label: 'EVENTS' },
  { ref: '/posts', label: 'POSTS' },
  { ref: '/court_bookings', label: 'BOOKINGS', prefetch: false },
  { ref: '/contact', label: 'CONTACT', prefetch: false },
  { ref: '/account', label: 'ACCOUNT', prefetch: false },
  { ref: '/api/route/signout', label: 'LOGOUT' } ///my-account
];

export const StyledNavLink = ({
  isActive,
  className,
  ...linkProps
}: LinkProps & {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <NavLink
    className={`${className ?? ''} ${isActive ? 'text-lime-900 text-lg font-semibold' : 'hover:text-lime-600 text-lime-700 font-medium'
      }`}
    {...linkProps}
  />
);

export function NavBar() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const pathname = usePathname();
  const [linkRef, setLinkRef] = useState<LinkProps['href']>(pathname!);
  const toggleOpen = useCallback(
    () => setIsMenuShown(!isMenuShown),
    [isMenuShown]
  );

  
  return (
    <>
      <button
        className="block md:hidden float-right relative z-50"
        onClick={toggleOpen}
      >
        <div className="space-y-2 absolute top-0 right-5">
          {(isMenuShown
            ? [
              'rotate-45 translate-y-[13px]',
              'opacity-0 h-0',
              '-rotate-45 translate-y-[-13px]',
            ]
            : ['', '', '']
          ).map((className, index) => (
            <span
              key={index}
              className={
                'block h-[4px] w-8 bg-lime-900 transform transition duration-500 ease-in-out ' +
                className
              }
            ></span>
          ))}
        </div>
      </button>
      <nav
        className={`${isMenuShown
            ? 'max-md:w-full max-md:opacity-100'
            : 'max-md:w-0 max-md:opacity-0'
          } transition-all duration-500 ease-in-out md:block overflow-hidden max-md:absolute max-md:animate-sideways-once max-md:h-screen max-md:bg-white max-md:pt-24 z-40 top-0 right-0`}
      >
        <ul className="flex flex-col items-center md:flex-row gap-10 md:gap-4 min-[900px]:gap-5 lg:gap-8 justify-end text-sm md:text-[15px] leading-[22px]">
          <li key={'/'} className="relative">
            <StyledNavLink
              isActive={'/' === linkRef}
              href={'/'}
              onClick={() => {
                setLinkRef('/');
                setIsMenuShown(false);
              }}
            >
              HOME
            </StyledNavLink>
            {/* <span className="absolute -bottom-5 md:hidden border-b-2 w-48 left-[calc(50%_-_theme(space.24))]" /> */}
          </li>
          <li key={'/events'} className="relative">
            <StyledNavLink
              isActive={'/events' === linkRef}
              href={'/events'}
              onClick={() => {
                setLinkRef('/events');
                setIsMenuShown(false);
              }}
            >
              EVENTS
            </StyledNavLink>
            {/* <span className="absolute -bottom-5 md:hidden border-b-2 w-48 left-[calc(50%_-_theme(space.24))]" /> */}
          </li>
          <li key={'/posts'} className="relative">
            <StyledNavLink
              isActive={'/posts' === linkRef}
              href={'/posts'}
              onClick={() => {
                setLinkRef('/posts');
                setIsMenuShown(false);
              }}
            >
              POSTS
            </StyledNavLink>
            {/* <span className="absolute -bottom-5 md:hidden border-b-2 w-48 left-[calc(50%_-_theme(space.24))]" /> */}
          </li>
          <li key={'/contact'} className="relative">
            <StyledNavLink
              isActive={'/contact' === linkRef}
              href={'/contact'}
              onClick={() => {
                setLinkRef('/contact');
                setIsMenuShown(false);
              }}
            >
              CONTACT
            </StyledNavLink>
            {/* <span className="absolute -bottom-5 md:hidden border-b-2 w-48 left-[calc(50%_-_theme(space.24))]" /> */}
          </li>
          <li key={'/court_bookings'} className="relative">
            <StyledNavLink
              isActive={'/court_bookings' === linkRef}
              href={'/court_bookings'}
              onClick={() => {
                setLinkRef('/court_bookings');
                setIsMenuShown(false);
              }}
            >
              COURT BOOKINGS
            </StyledNavLink>
            {/* <span className="absolute -bottom-5 md:hidden border-b-2 w-48 left-[calc(50%_-_theme(space.24))]" /> */}
          </li>
          <li key={'/account'} className="relative">
            <StyledNavLink
              isActive={'/account' === linkRef}
              href={'/account'}
              onClick={() => {
                setLinkRef('/account');
                setIsMenuShown(false);
              }}
            >
              ACCOUNT
            </StyledNavLink>
            {/* <span className="absolute -bottom-5 md:hidden border-b-2 w-48 left-[calc(50%_-_theme(space.24))]" /> */}
          </li>
          <li key={'/api/route/signout'} className="relative">
            <StyledNavLink
              isActive={'/api/route/signout' === linkRef}
              href={'/api/route/signout'}
              onClick={(e) => {
                setLinkRef('/api/route/signout');
                setIsMenuShown(false);
                e.preventDefault();
                signOut();
                window.alert("You have logged out successfully")
              }}
            >
              LOGOUT
            </StyledNavLink>
            {/* <span className="absolute -bottom-5 md:hidden border-b-2 w-48 left-[calc(50%_-_theme(space.24))]" /> */}
          </li>
        </ul>
      </nav>
    </>
  );
}
