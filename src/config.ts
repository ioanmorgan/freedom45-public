export const CALENDLY_URL = 'https://calendly.com/ioanamorgan90/30min';
export const CONTACT_EMAIL = 'hello@freedom45.co.uk';
export const SITE_NAME = 'Freedom45';
export const COMPANY_NUMBER = '17127746';

// GitHub Pages serves pages as directories and 301s "/services" to "/services/",
// so canonical/sitemap URLs use the trailing-slash form that actually resolves.
export const pageUrl = (pathname: string, site: URL) =>
  new URL(pathname.endsWith('/') ? pathname : `${pathname}/`, site).href;
