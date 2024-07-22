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
  const from = location.state?.from || '/';

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isAuthenticated) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isAuthenticated) {
    // ...то отправляем его на страницу логин
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return <>{children}</>;
};

export default ProtectedRoute;
