import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { loginUser } from '../../services/slices/userSlice';
import { useDispatch, useSelector, RootState } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, hasError } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile'); // Перенаправление после успешного входа
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password }) as any);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginUI
      errorText={hasError ? 'Invalid login credentials' : ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
