import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        // Redirect to the login page if no token is found
        router.push('/login');
      } else {
        // Token exists, user is authenticated
        setIsAuthenticated(true);
      }
    }, []);

    // Render null or a loading indicator until authentication status is determined
    if (!isAuthenticated) return null;

    // Render the protected component if authenticated
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
