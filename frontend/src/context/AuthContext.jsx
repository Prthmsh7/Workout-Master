import { createContext, useState, useEffect, useContext } from 'react';
import { useUser, useAuth as useClerkAuth, useClerk } from '@clerk/clerk-react';
import { getUserProfile, updateUserProfile } from '../utils/api';

const AuthContext = createContext();

// This is a compatibility layer that wraps Clerk's auth functionality
// to maintain the same API for the rest of the application
export const AuthProvider = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useClerkAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  // Load user profile data when signed in
  useEffect(() => {
    const loadProfile = async () => {
      if (isSignedIn && isLoaded) {
        try {
          setLoading(true);
          const response = await getUserProfile();
          if (response.success) {
            setProfileData(response.data);
          }
        } catch (error) {
          console.error('Failed to load profile:', error);
        } finally {
          setLoading(false);
        }
      } else if (isLoaded) {
        setProfileData(null);
        setLoading(false);
      }
    };

    loadProfile();
  }, [isSignedIn, isLoaded]);

  // Create a merged user object that combines Clerk user and profile data
  const mergedUser = isSignedIn && user ? {
    id: user.id,
    name: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
    email: user.primaryEmailAddress?.emailAddress,
    imageUrl: user.imageUrl,
    // Include any additional profile data from our backend
    ...profileData
  } : null;

  // These functions are placeholders to maintain API compatibility
  // They're not used directly since Clerk handles auth UI
  const register = async () => {
    setError('Registration is handled by Clerk UI');
    throw new Error('Registration is handled by Clerk UI');
  };

  const login = async () => {
    setError('Login is handled by Clerk UI');
    throw new Error('Login is handled by Clerk UI');
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut();
      return { success: true };
    } catch (error) {
      setError(error.message || 'Logout failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile (this still goes to our backend)
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const response = await updateUserProfile(userData);
      if (response.success) {
        setProfileData(response.data);
      }
      return response;
    } catch (error) {
      setError(error.message || 'Profile update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: mergedUser,
        loading: loading || !isLoaded,
        error,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: isSignedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext); 