'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (adminOnly && user.role !== 'admin') {
        router.push('/dashboard');
      }
    }
  }, [user, loading, adminOnly, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (adminOnly && user.role !== 'admin')) {
    return null;
  }

  return children;
};

export default ProtectedRoute; 