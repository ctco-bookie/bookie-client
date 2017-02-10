window._paq = window._paq || [];
const u = `${process.env.REACT_APP_PIWIK_URL}`;
const id = `${process.env.REACT_APP_PIWIK_SITEID}`;
window._paq.push(['setTrackerUrl', u + '/piwik.php']);
window._paq.push(['setSiteId', id]);
window._paq.push(['setDoNotTrack', false]);
window._paq.push(['discardHashTag', false]);
const d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
g.type = 'text/javascript';
g.async = true;
g.defer = true;
g.src = u + '/piwik.js';
s.parentNode.insertBefore(g, s);

const isTrackingEnabled = `${process.env.REACT_APP_PIWIK}` === 'enabled';

export const trackEvent = (action, metadata) => {
  if (isTrackingEnabled) {
    window._paq.push(['trackEvent', 'Bookie', action, metadata]);
  }
};

export const trackPageView = (title) => {
  if (isTrackingEnabled) {
    window._paq.push(['trackPageView', title]);
  }
};
