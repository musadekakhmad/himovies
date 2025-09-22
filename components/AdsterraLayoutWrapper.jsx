"use client";

import { useEffect } from 'react';

export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    // Memastikan window tersedia sebelum memuat skrip iklan
    if (typeof window !== 'undefined') {
      // Memuat skrip iklan Native Banner
      const loadNativeBanner = () => {
        if (!document.getElementById('native-banner-script')) {
          const nativeBannerScript = document.createElement('script');
          nativeBannerScript.id = 'native-banner-script';
          nativeBannerScript.src = "//discreetisabella.com/f164b40cd7c6863996c9ec4da638c7c6/invoke.js";
          nativeBannerScript.async = true;
          nativeBannerScript.setAttribute('data-cfasync', 'false');
          document.body.appendChild(nativeBannerScript);
        }
      };

      // Memuat skrip iklan Popunder
      const loadPopunder = () => {
        if (!document.getElementById('popunder-script')) {
          const popunderScript = document.createElement('script');
          popunderScript.id = 'popunder-script';
          popunderScript.type = 'text/javascript';
          popunderScript.src = "//discreetisabella.com/c7/3a/0e/c73a0e19990f3f1ff44e5390d71d2008.js";
          popunderScript.async = true;
          document.body.appendChild(popunderScript);
        }
      };

      // Memuat skrip iklan Social Bar
      const loadSocialBar = () => {
        if (!document.getElementById('social-bar-script')) {
          const socialBarScript = document.createElement('script');
          socialBarScript.id = 'social-bar-script';
          socialBarScript.type = 'text/javascript';
          socialBarScript.src = "//discreetisabella.com/a8/17/e6/a817e64528fc30fbb2d6cc720d28d0b8.js";
          socialBarScript.async = true;
          document.body.appendChild(socialBarScript);
        }
      };

      // Tunggu hingga DOM sepenuhnya dimuat sebelum menambahkan script
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          loadNativeBanner();
          loadPopunder();
          loadSocialBar();
        });
      } else {
        loadNativeBanner();
        loadPopunder();
        loadSocialBar();
      }

      // Cleanup function untuk menghapus skrip saat komponen di-unmount
      return () => {
        const nativeBannerScript = document.getElementById('native-banner-script');
        const popunderScript = document.getElementById('popunder-script');
        const socialBarScript = document.getElementById('social-bar-script');
        
        if (nativeBannerScript) document.body.removeChild(nativeBannerScript);
        if (popunderScript) document.body.removeChild(popunderScript);
        if (socialBarScript) document.body.removeChild(socialBarScript);
      };
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
}