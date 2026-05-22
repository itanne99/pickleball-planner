import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { mockUser } from '@/data/mock';

export function useAuthGuard(requiredRole) {
  const router = useRouter();

  useEffect(() => {
    if (!mockUser || mockUser.role !== requiredRole) {
      router.replace('/');
    }
  }, [requiredRole, router]);

  return mockUser?.role === requiredRole;
}
