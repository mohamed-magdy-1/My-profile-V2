'use client';
import { ProgressProvider } from '@bprogress/next/app'; // أو المكتبة التي تستخدمها

export default function ProgressClient() {
  return (
    <ProgressProvider
      height="4px"
      color="#52a9ff"
      options={{ showSpinner: true }}
      shallowRouting
    />
  );
}
