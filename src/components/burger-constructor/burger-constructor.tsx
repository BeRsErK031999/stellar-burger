import { FC, useState, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { setSelectedIngredient } from '../../services/slices/ingredientsSlice';
import { Modal } from '../modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const selectConstructorItems = (state: { constructorItems: any }) =>
  state.constructorItems;
const selectOrderRequest = (state: { order: { orderRequest: any } }) =>
  state.order.orderRequest;
const selectUser = (state: { user: { user: any } }) => state.user.user;
const selectOrderModalData = (state: { order: { orderModalData: any } }) =>
  state.order.orderModalData;
const selectSelectedIngredient = (state: {
  ingredients: { selectedIngredient: any };
}) => state.ingredients.selectedIngredient;

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const user = useSelector(selectUser);
  const orderModalData = useSelector(selectOrderModalData);
  const selectedIngredient = useSelector(selectSelectedIngredient);

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
    if (!constructorItems.bun || orderRequest) return;
    // Add logic for creating an order
  };

  const closeOrderModal = () => {
    // Add logic for closing order modal
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <div>
      <BurgerConstructorUI
        price={price}
        orderRequest={orderRequest}
        constructorItems={constructorItems}
        orderModalData={orderModalData}
        onOrderClick={onOrderClick}
        closeOrderModal={closeOrderModal}
        onIngredientClick={onIngredientClick}
      />
      {isIngredientModalOpen && (
        <Modal title='Ingredient Details' onClose={closeIngredientModal}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
};
