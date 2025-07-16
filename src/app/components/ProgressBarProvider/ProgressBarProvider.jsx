'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function ProgressClient() {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({
      showSpinner: true,
      trickleSpeed: 200,
    });

    const handleStart = () => NProgress.start();
    const handleDone = () => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleDone);
    router.events.on('routeChangeError', handleDone);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleDone);
      router.events.off('routeChangeError', handleDone);
    };
  }, [router]);

  return null; // لا تحتاج لعرض أي UI هنا
}
