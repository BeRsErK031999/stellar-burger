import { FC, useState, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { setSelectedIngredient } from '../../services/slices/ingredientsSlice';
import { ModalWrapper } from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { RootState } from '../../services/store';
import { removeIngredient } from '../../services/slices/orderSlice';
import styles from './burger-constructor.module.css';
import {
  moveIngredientUp,
  moveIngredientDown
} from '../../services/slices/orderSlice';

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
  const ingredients = useSelector(selectOrderIngredients).map((ingredient) => ({
    ...ingredient,
    id: ingredient._id
  })) as TConstructorIngredient[];

  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);

  const onIngredientClick = (ingredient: TConstructorIngredient) => {
    dispatch(setSelectedIngredient(ingredient));
    setIsIngredientModalOpen(true);
  };

  const closeIngredientModal = () => {
    setIsIngredientModalOpen(false);
    dispatch(setSelectedIngredient(null));
  };

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!bun || orderRequest) return;
    // Add logic for creating an order
  };

  const closeOrderModal = () => {
    // Add logic for closing order modal
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
      onMoveIngredientUp={handleMoveIngredientUp} // Добавлено
      onMoveIngredientDown={handleMoveIngredientDown} // Добавлено
    />
  );
};
