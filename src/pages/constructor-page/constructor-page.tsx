// src/pages/constructor-page/constructor-page.tsx

import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components/ui/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { Preloader } from '../../components/ui/preloader/preloader';
import { FC } from 'react';
import React from 'react';

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
      ) : hasError ? (
        <p>Ошибка загрузки данных</p>
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients
              currentTab='bun'
              buns={items.filter((item) => item.type === 'bun')}
              mains={items.filter((item) => item.type === 'main')}
              sauces={items.filter((item) => item.type === 'sauce')}
              titleBunRef={React.createRef()}
              titleMainRef={React.createRef()}
              titleSaucesRef={React.createRef()}
              bunsRef={React.createRef()}
              mainsRef={React.createRef()}
              saucesRef={React.createRef()}
              onTabClick={(tab: string) => console.log(`Tab clicked: ${tab}`)}
            />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
