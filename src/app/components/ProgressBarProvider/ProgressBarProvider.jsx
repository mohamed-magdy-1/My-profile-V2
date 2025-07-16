'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function ProgressClient() {
  const pathname = usePathname();

  useEffect(() => {
    // إعداد nProgress مرة واحدة
    nProgress.configure({ showSpinner: true, trickleSpeed: 200 });

    nProgress.start();

    const timeout = setTimeout(() => {
      nProgress.done();
    }, 300); // مدة تحميل وهمية يمكنك تعديلها

    return () => {
      clearTimeout(timeout);
      nProgress.done(); // تأكيد إنهاء التحميل عند التغيير
    };
  }, [pathname]);

  return null;
}
