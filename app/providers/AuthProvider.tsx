'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { createOrUpdateUser } from '../firebase/db';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          // Check if user exists in database
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);

          if (!userDoc.exists()) {
            // First time user - create their records
            console.log('Creating new user record');
            await createOrUpdateUser({
              uid: user.uid,
              email: user.email || '',
              lastLogin: Date.now(),
            });
          } else {
            // Existing user - just update login time
            console.log('Updating existing user');
            await createOrUpdateUser({
              uid: user.uid,
              email: user.email || '',
              lastLogin: Date.now(),
            });
          }
        } catch (err) {
          console.error('Error handling user data:', err);
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } else {
        router.push('/login');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 