import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { constructorItems, orderRequest, user, orderModalData } = useSelector(
    (state) => ({
      constructorItems: state.constructorItems,
      orderRequest: state.order.orderRequest,
      user: state.user.user,
      orderModalData: state.order.orderModalData
    })
  );

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    // Логика создания заказа
    console.log('Создаем заказ');
  };

  const closeOrderModal = () => {
    // Логика закрытия модального окна
    console.log('Закрываем модальное окно заказа');
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
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
