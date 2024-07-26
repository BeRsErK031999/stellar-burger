import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { OrderInfo } from '@components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ProtectedRoute from '../../pages/PrivateRoute';
import { useDispatch, useSelector, RootState } from '../../services/store';
import {
  fetchIngredients,
  setSelectedIngredient
} from '../../services/slices/ingredientsSlice';
import { fetchUser } from '../../services/slices/userSlice';
import { OrderDetailsPage } from '../../pages/order-details-page';
import ModalWrapper from '../modal/modal';

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
    dispatch(fetchUser());
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
          <Route path='/feed/:id' element={<OrderDetailsPage />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route
            path='/ingredients/:id'
            element={<IngredientDetails onClose={handleCloseModal} />}
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        {background && selectedIngredient && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <ModalWrapper
                  title='Детали ингредиента'
                  onClose={handleCloseModal}
                >
                  <IngredientDetails
                    ingredient={selectedIngredient}
                    onClose={handleCloseModal}
                  />
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
