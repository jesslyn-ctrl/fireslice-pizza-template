import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/lib/firebase';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          // Once we know the auth state, stop the loading state
          setLoading(false);
        });
    
        // Cleanup on unmount
        return () => unsubscribe();
    }, [auth]);

    // Show nothing (or a loading spinner) until we know the auth state
    if (loading) {
        return <LoadingSpinner />;
    }

    // Check if user is authenticated
    if (!auth.currentUser) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;