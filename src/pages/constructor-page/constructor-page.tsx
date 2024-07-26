import { useRef, useState } from 'react';
import { useSelector } from '../../services/store';
import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components/ui/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { Preloader } from '../../components/ui/preloader/preloader';
import { FC } from 'react';
import { TTabMode } from '@utils-types';
import React from 'react';

export const ConstructorPage: FC = () => {
  const { items, isLoading, hasError } = useSelector(
    (state) => state.ingredients
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
  };

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
              currentTab={currentTab}
              buns={items.filter((item) => item.type === 'bun')}
              mains={items.filter((item) => item.type === 'main')}
              sauces={items.filter((item) => item.type === 'sauce')}
              titleBunRef={titleBunRef}
              titleMainRef={titleMainRef}
              titleSaucesRef={titleSaucesRef}
              bunsRef={bunsRef}
              mainsRef={mainsRef}
              saucesRef={saucesRef}
              onTabClick={handleTabClick}
            />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
