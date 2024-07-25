import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../services/store';
import { FC, PropsWithChildren } from 'react';

interface ProtectedRouteProps {
  anonymous?: boolean;
}

const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
  children,
  anonymous = false
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (anonymous && isAuthenticated) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
