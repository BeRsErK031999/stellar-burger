import { FC, useState, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { setSelectedIngredient } from '../../services/slices/ingredientsSlice';
import { ModalWrapper } from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { RootState } from '../../services/store';
import { ConstructorElement } from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

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
  const bun = useSelector(selectOrderBun);
  const ingredients = useSelector(selectOrderIngredients);

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

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0),
    [bun, ingredients]
  );

  return (
    <div className={styles.burgerConstructor}>
      {bun && (
        <div className={`${styles.element} mt-4 mr-4`}>
          <ConstructorElement
            type='top'
            isLocked
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <ul className={styles.elements}>
        {ingredients.map((item, index) => (
          <div
            key={item._id}
            onClick={() => onIngredientClick({ ...item, id: item._id })}
          >
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              key={item._id}
            />
          </div>
        ))}
      </ul>
      {bun && (
        <div className={`${styles.element} mt-4 mr-4`}>
          <ConstructorElement
            type='bottom'
            isLocked
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      {isIngredientModalOpen && selectedIngredient && (
        <ModalWrapper title='Ingredient Details' onClose={closeIngredientModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </ModalWrapper>
      )}
    </div>
  );
};
