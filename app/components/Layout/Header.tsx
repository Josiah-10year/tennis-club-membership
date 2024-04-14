import { NavBar } from "./NavBar/NavBar";

const Header = () => (
  <>
    <header
      className="absolute md:fixed h-header bg-white z-40 w-full"
    //   data-testid={testIds.LAYOUT.HEADER}
    >
      <div className="relative flex justify-center max-w-full-content mx-auto gap-8 h-header items-center">
        <a
          href="/"
          target="_self"
          className="flex flex-col justify-between items-center min-w-[300px] ml-3"
        >
          <img className="w-8 h-8 rounded-full mr-2" src="https://github.com/Josiah-10year/tennis-club-membership/blob/21819b412dec202fe45d8a1bacb6be58b7cf73eb/app/images/club-logo.png?raw=true" ></img>
          <div className="font-bold sm:text-sm lg:text-xl xl:text-xl mb-3">St. Augustine Recreational Club</div>
        </a>
        <div className="flex-grow pb-5 pr-5">
          <NavBar />
        </div>
      </div>
    </header>
    <div className="h-header"></div>
  </>
);

export default Header;
