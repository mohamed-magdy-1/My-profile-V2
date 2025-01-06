'use client';

import { useEffect } from 'react';


const useLordIconSetup = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('lottie-web').then(lottie => {
        import('lord-icon-element').then(({ defineElement }) => {
          defineElement(lottie.loadAnimation);
        });
      });
    }
  }, []);
};


const LordIconDocument = () => {
  useLordIconSetup();

  return (
    <lord-icon
        className='icon-Document lord-icon'
      src="/icons/document.json"
      trigger="loop"
      delay="2000"
      style={{ width: "30px", height: "30px" }}
    ></lord-icon>
  );
};


const LordIconGlobe = () => {
  useLordIconSetup();

  return (
    <lord-icon
    className='icon-Globe lord-icon'
      src="/icons/globe.json"
      trigger="loop"
      delay="2000"
      style={{ width: "30px", height: "30px" }}
    ></lord-icon>
  );
};

export { LordIconDocument, LordIconGlobe };
