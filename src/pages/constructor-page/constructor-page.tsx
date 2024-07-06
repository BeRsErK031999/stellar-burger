import { useEffect, FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const { items, isLoading, hasError } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients items={items} />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
