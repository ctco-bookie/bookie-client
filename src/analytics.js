const isTrackingEnabled = () => {
  return `${process.env.REACT_APP_PIWIK}` === 'enabled';
};

export const trackEvent = (action, metadata) => {
  if (isTrackingEnabled()) {
    window._paq.push(['trackEvent', 'Bookie', action, metadata]);
  }
};

export const trackPageView = (title) => {
  if (isTrackingEnabled()) {
    window._paq.push(['trackPageView', title]);
  }
};
