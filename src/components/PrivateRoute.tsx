import { FC, ReactNode, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Spinner, Box } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { checkAuth, logout } from '@/slices/auth.slice';
import { toaster } from './ui/toaster';

interface PrivateRouteProps {
  children: ReactNode;
  disabled?: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children,disabled}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error } = useAppSelector((state) => state.authSlice);

  function RedirectToLogin() {
      toaster.create({
        title: 'Unauthorized',
        type: 'error',
        description: 'You need to be logged in to access this page',
      });
      navigate("/auth", { state: { from: location } });
  }

  useEffect(() => {
    if (!user && !disabled) {
      dispatch(checkAuth());
    }
  }, [user, dispatch, disabled]);

  useEffect(() => {
    if (error) {
      console.error('error:', error);
      RedirectToLogin();
      dispatch(logout());
    }
  }, [error, navigate, dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (disabled) {
    return children ? <>{children}</> : <Outlet />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;