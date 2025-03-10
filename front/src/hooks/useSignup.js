import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }
      if (response.ok) {
        //save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));
        //update the auth context
        dispatch({ type: 'LOGIN', payload: json });
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError('Failed to connect to the server. Please try again.');
    }
  };
  return { signup, isLoading, error };
};
