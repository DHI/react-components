/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';

/**
 * Hook to use Matomo tracking, it will load the Matomo script and track events
 *
 * Requires the following environment variables:
 * - REACT_APP_MATOMO_COOKIE_DOMAIN
 * - REACT_APP_MATOMO_SITE_ID
 *
 * Reminder: Remember to update your build script to include the environment variables.
 *
 * Reminder: Add this to your App.tsx file for initialization.
 *
 * @returns {Object} trackEvent function
 */
export const useMatomo = () => {
  const _window = window as any;

  useEffect(() => {
    // Matomo is already loaded, do nothing
    if (_window._paq) {
      return;
    }

    // eslint-disable-next-line no-multi-assign
    const _paq = (_window._paq = _window._paq || []);

    const siteId = process.env.REACT_APP_MATOMO_SITE_ID;
    const cookieDomain = process.env.REACT_APP_MATOMO_COOKIE_DOMAIN;

    if (!cookieDomain || !siteId) {
      throw new Error('Missing Matomo configuration');
    }

    // Matomo configuration
    _paq.push(['setCookieDomain', cookieDomain]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    _paq.push(['setTrackerUrl', 'https://dhigroup.matomo.cloud/matomo.php']);
    _paq.push(['setSiteId', siteId]);

    const g = document.createElement('script');
    g.async = true;
    g.src = 'https://cdn.matomo.cloud/dhigroup.matomo.cloud/matomo.js';

    const h = document.getElementsByTagName('head')[0];
    h.appendChild(g);
  }, []);

  const trackEvent = (
    category: string,
    action: string,
    name?: string,
    value?: string
  ) => {
    const { _paq } = _window;

    if (!_paq) {
      return;
    }

    if (name && value) {
      _paq.push(['trackEvent', category, action, name, value]);
    } else if (name) {
      _paq.push(['trackEvent', category, action, name]);
    } else {
      _paq.push(['trackEvent', category, action]);
    }
  };

  return { trackEvent };
};
