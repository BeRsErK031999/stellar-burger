import { useSelector } from 'react-redux';
import { Navigate, RouteProps } from 'react-router-dom';
import { RootState } from '../services/store';
import { FC } from 'react';

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
