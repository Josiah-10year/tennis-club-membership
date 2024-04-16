"use client"
import { NavBar } from "./NavBar/NavBar";

let path = ""
if(typeof window !== "undefined") {
  path = window.location.pathname
}

const isRestrictedPath = path === '/login' || path === '/register' || path === '/admin';

const Header = () => (
  <>
  {!isRestrictedPath && (
    
    <header
      className="absolute md:fixed bg-lime-100 w-full"

    >

      <div className="relative flex justify-center py-3 max-w-full-content mx-auto gap-8 h-header items-center">
        <a
          href="/"
          target="_self"
          className="w-auto pl-2"
        >
          <div className="flex justify-start items-center">
            <img className="w-auto h-12 rounded mr-2" src="https://raw.githubusercontent.com/Josiah-10year/tennis-club-membership/new-opps/app/images/club-logo.png" ></img>
            <p className="text-lime-900 font-semibold text-base md:hidden">St. Augustine Recreational Club</p>
          </div>
        </a>
        <div className="flex-grow md:flex-grow-0">
          <NavBar />
        </div>
      </div>
    </header>
  )}
  </>
);

export default Header;
