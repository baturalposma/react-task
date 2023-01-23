import React, { useEffect } from 'react';

const UTMPage = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmTerm = urlParams.get('utm_term');

    localStorage.setItem('utmSource', utmSource);
    localStorage.setItem('utmMedium', utmMedium);
    localStorage.setItem('utmTerm', utmTerm);
  }, []);

  return <div>UTM parameters have been saved to local storage.</div>;
};

export default UTMPage;