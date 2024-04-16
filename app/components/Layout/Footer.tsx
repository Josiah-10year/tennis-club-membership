"use client"
import './footer.css';

let path = ""
if(typeof window !== "undefined") {
  path = window.location.pathname
}


const isRestrictedPath = path === '/login' || path === '/register' || path === '/admin';

const Footer = () => (
  <>
  {!isRestrictedPath && (
    <div>
      <div className="footer text-sm py-4 flex justify-center bg-lime-100">
        <p className='text-lime-900'>©2024 St. Augustine Recreational Club</p>
      </div>
    </div>
  )}
  </>
  
);

export default Footer;