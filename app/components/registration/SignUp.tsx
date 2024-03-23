import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LinkProps } from 'next/link';
import { NavBar } from "../Layout/NavBar/NavBar";


export default function Contact() {
  const pathname = usePathname();
  const [linkRef, setLinkRef] = useState<LinkProps['href']>(pathname!);
  return (
    <div className="relative">
      <div className="w-full h-[400px] relative">
        <div className="max-w-7xl mx-auto mt-[-120px] relative bg-white px-8 sm:px-20">
          <h1 className="text-center py-8 font-site">Contact</h1>
          <div className="max-w-4xl mx-auto">
            <h3 className="font-site text-lg my-3">Volunteer</h3>
            <form className="border-2 border-blue-site p-8">
              <div className="flex flex-col sm:flex-row sm:gap-12">
                <div className="basis-1/2">
                  <label className="text-xs" htmlFor="name">
                    First name *
                  </label>
                  <input
                    className="input"
                    type="text"
                    name="name"
                    id="name"
                    required={true} />
                  <label className="text-xs" htmlFor="email">
                    Email *
                  </label>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    id="email"
                    required={true} />
                </div>
                <div className="basis-1/2">
                  <label className="text-xs" htmlFor="name">
                    Last name
                  </label>
                  <input className="input" type="text" name="last" id="last" />
                  <label className="text-xs" htmlFor="phone">
                    Phone
                  </label>
                  <input className="input" type="tel" name="phone" id="phone" />
                </div>
              </div>
              <label className="text-xs" htmlFor="address">
                Address
              </label>
              <input className="input" type="text" name="address" id="address" />
              <button className="btn-main w-full mt-6 text-xl" type="submit">
                Apply
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    // {/* <NavBar items={navbarItems} linkRef={linkRef} /></> */}
  );
};