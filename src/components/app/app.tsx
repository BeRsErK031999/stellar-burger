import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { ConstructorPage } from '@pages';
import { Feed } from '@pages';
import { Login } from '@pages';
import { Register } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Profile } from '@pages';
import { ProfileOrders } from '@pages';
import { NotFound404 } from '@pages';
import { OrderInfo } from '@components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ModalWrapper } from '../../components/modal/modal';
import PrivateRoute from '../../pages/PrivateRoute';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  setSelectedIngredient
} from '../../services/slices/ingredientsSlice';
import { fetchUser } from '../../services/slices/userSlice'; // Импортируем экшен для получения данных пользователя
import { RootState } from '../../services/store';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const selectedIngredient = useSelector(
    (state: RootState) => state.ingredients.selectedIngredient
  );

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser()); // Запрашиваем данные пользователя при инициализации приложения
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
    dispatch(setSelectedIngredient(null));
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <PrivateRoute>
                <ProfileOrders />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route
            path='/profile/orders/:number'
            element={
              <PrivateRoute>
                <OrderInfo />
              </PrivateRoute>
            }
          />
        </Routes>
        {background && selectedIngredient && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <ModalWrapper
                  title='Ingredient Details'
                  onClose={handleCloseModal}
                >
                  <IngredientDetails ingredient={selectedIngredient} />
                </ModalWrapper>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default App;
