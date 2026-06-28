import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function TeamScheduleRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/schedule');
  }, [router]);

  return <LoadingSpinner fullScreen text="Redirecting to Schedule..." />;
}
