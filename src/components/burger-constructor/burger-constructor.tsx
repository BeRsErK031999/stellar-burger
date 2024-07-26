import { FC, useState, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient } from '../../utils/types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { setSelectedIngredient } from '../../services/slices/ingredientsSlice';
import { ModalWrapper } from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { RootState } from '../../services/store';
import {
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  setOrderRequest,
  setOrderNumber,
  setOrderModalData // Добавлено
} from '../../services/slices/orderSlice';
import styles from './burger-constructor.module.css';
import { getCookie } from '../../utils/cookie'; // Импорт функции для получения токена

const selectOrderRequest = (state: RootState) => state.order.orderRequest;
const selectUser = (state: RootState) => state.user.user;
const selectOrderModalData = (state: RootState) => state.order.orderModalData;
const selectSelectedIngredient = (state: RootState) =>
  state.ingredients.selectedIngredient;
const selectOrderBun = (state: RootState) => state.order.bun;
const selectOrderIngredients = (state: RootState) => state.order.ingredients;

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderRequest = useSelector(selectOrderRequest);
  const user = useSelector(selectUser);
  const orderModalData = useSelector(selectOrderModalData);
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const bun = useSelector(selectOrderBun) as TConstructorIngredient | null;
  const ingredients = useSelector(
    selectOrderIngredients
  ) as TConstructorIngredient[];

  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);

  const onIngredientClick = (ingredient: TConstructorIngredient) => {
    dispatch(setSelectedIngredient(ingredient));
    setIsIngredientModalOpen(true);
  };

  const closeIngredientModal = () => {
    setIsIngredientModalOpen(false);
    dispatch(setSelectedIngredient(null));
  };

  const onOrderClick = async () => {
    if (!user) {
      console.log('User not authenticated, redirecting to login...');
      navigate('/login');
      return;
    }
    if (!bun || orderRequest) return;

    dispatch(setOrderRequest(true));

    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        throw new Error('Access token is missing');
      }

      console.log('AccessToken:', accessToken); // Логируем токен перед запросом

      const ingredientIds = [bun, ...ingredients].map(
        (ingredient) => ingredient._id
      );

      console.log('Sending order request with ingredients:', ingredientIds);

      const response = await fetch(
        'https://norma.nomoreparties.space/api/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          },
          body: JSON.stringify({
            ingredients: ingredientIds
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Order response data:', data);
      dispatch(setOrderNumber(data.order.number));
      dispatch(setOrderModalData(data.order)); // Добавлено: сохранение данных заказа в store
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
    } finally {
      dispatch(setOrderRequest(false));
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null)); // Сброс данных модального окна
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    dispatch(removeIngredient(ingredientId));
  };

  const handleMoveIngredientUp = (index: number) => {
    dispatch(moveIngredientUp(index));
  };

  const handleMoveIngredientDown = (index: number) => {
    dispatch(moveIngredientDown(index));
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      onIngredientClick={onIngredientClick}
      onRemoveIngredient={handleRemoveIngredient}
      onMoveIngredientUp={handleMoveIngredientUp}
      onMoveIngredientDown={handleMoveIngredientDown}
    />
  );
};
