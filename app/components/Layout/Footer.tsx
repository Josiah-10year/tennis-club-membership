import './footer.css';
import Image from 'next/image';
import ScrollIntoView from '../ScrollIntoView';

const FooterNote = () => (
  <div className="text-xs">
    <p>© 2023 by Personal Life Coach.</p>
    <p>
      <span>Powered and secured by </span>
      <span>
        <a
          className="underline"
          href="https://wix.com/?utm_campaign=vir_created_with"
          target="_blank"
          rel="noreferrer noopener"
        >
          Wix
        </a>
      </span>
    </p>
  </div>
);

const Footer = () => (
  <footer className="w-full bg-turquoise-100 leading-7 flex-shrink-0 px-4"> {/* Added px-4 for left padding */}
    <div className="max-w-full-content mx-auto flex flex-col sm:flex-row gap-2 pt-11 pb-20">
      <div className="flex-1">
        <div className="footer-widget-area widget-area site-footer-focus-item" data-section="section-footer-menu">
          <div className="footer-bar-navigation">
            <nav className="site-navigation ast-flex-grow-1 navigation-accessibility footer-navigation" id="footer-site-navigation" aria-label="Site Navigation">
              <div className="footer-nav-wrap">
                <ul id="astra-footer-menu" className="ast-nav-menu flex flex-wrap justify-center sm:justify-start gap-2">
                  <li className="menu-item">
                    <a href="https://ecom.micahb.me/" className="menu-link">Home</a>
                  </li>
                  <li className="menu-item">
                    <a href="https://google.com/" className="menu-link">About</a>
                  </li>
                  <li className="menu-item">
                    <a href="https://youtube.com/" className="menu-link">Shop</a>
                  </li>
                  <li className="menu-item">
                    <a href="https://twitter.com/" className="menu-link">Contact</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <aside className="footer-widget-area widget-area site-footer-focus-item footer-widget-area-inner" data-section="sidebar-widgets-footer-widget-1" aria-label="Footer Widget 1">
          <section id="block-7" className="widget widget_block widget_media_image">
            <figure className="wp-block-image size-full is-resized"></figure>
          </section>
        </aside>
      </div>
      <div className="flex-1">
        <div className="ast-builder-layout-element ast-flex site-footer-focus-item ast-footer-copyright" data-section="section-footer-builder">
          <div className="ast-footer-copyright">
            <p>Copyright © 2024 eCom Project</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
