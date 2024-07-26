import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../services/store';
import { TIngredient, TTabMode } from '@utils-types';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import styles from './burger-ingredients.module.css';
import { addIngredient } from '../../../services/slices/orderSlice';
import { BurgerIngredientUI } from '../burger-ingredient/burger-ingredient';

interface BurgerIngredientsProps {
  currentTab: TTabMode;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  titleBunRef: React.RefObject<HTMLHeadingElement>;
  titleMainRef: React.RefObject<HTMLHeadingElement>;
  titleSaucesRef: React.RefObject<HTMLDivElement>;
  bunsRef: React.RefObject<HTMLDivElement>;
  mainsRef: React.RefObject<HTMLDivElement>;
  saucesRef: React.RefObject<HTMLDivElement>;
  onTabClick: (tab: string) => void;
}

export const BurgerIngredients: FC<BurgerIngredientsProps> = ({
  currentTab,
  buns,
  mains,
  sauces,
  titleBunRef,
  titleMainRef,
  titleSaucesRef,
  bunsRef,
  mainsRef,
  saucesRef,
  onTabClick
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredientCounts = useSelector((state) => state.order.ingredientCounts);

  const handleAddToOrder = (ingredient: TIngredient) => {
    dispatch(addIngredient(ingredient));
  };

  const [bunRef, inViewBun] = useInView({ threshold: 0.5 });
  const [sauceRef, inViewSauce] = useInView({ threshold: 0.5 });
  const [mainRef, inViewMain] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inViewBun) {
      onTabClick('bun');
    } else if (inViewSauce) {
      onTabClick('sauce');
    } else if (inViewMain) {
      onTabClick('main');
    }
  }, [inViewBun, inViewMain, inViewSauce, onTabClick]);

  const handleTabClick = (
    tab: string,
    ref: React.RefObject<HTMLDivElement | HTMLHeadingElement>
  ) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    onTabClick(tab);
  };

  return (
    <div className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <li>
            <button
              onClick={() => handleTabClick('bun', titleBunRef)}
              className={`${styles.tab} ${currentTab === 'bun' ? styles.active : ''}`}
            >
              Булки
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabClick('sauce', titleSaucesRef)}
              className={`${styles.tab} ${currentTab === 'sauce' ? styles.active : ''}`}
            >
              Соусы
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabClick('main', titleMainRef)}
              className={`${styles.tab} ${currentTab === 'main' ? styles.active : ''}`}
            >
              Начинки
            </button>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        <h2 ref={bunRef}>Булки</h2>
        <div ref={bunsRef} className={styles.ingredientsGrid}>
          {buns.map((bun) => (
            <BurgerIngredientUI
              key={bun._id}
              ingredient={bun}
              count={ingredientCounts[bun._id] || 0}
              locationState={{ background: location }}
              handleAdd={() => handleAddToOrder(bun)}
            />
          ))}
        </div>
        <h2 ref={sauceRef}>Соусы</h2>
        <div ref={saucesRef} className={styles.ingredientsGrid}>
          {sauces.map((sauce) => (
            <BurgerIngredientUI
              key={sauce._id}
              ingredient={sauce}
              count={ingredientCounts[sauce._id] || 0}
              locationState={{ background: location }}
              handleAdd={() => handleAddToOrder(sauce)}
            />
          ))}
        </div>
        <h2 ref={mainRef}>Начинки</h2>
        <div ref={mainsRef} className={styles.ingredientsGrid}>
          {mains.map((main) => (
            <BurgerIngredientUI
              key={main._id}
              ingredient={main}
              count={ingredientCounts[main._id] || 0}
              locationState={{ background: location }}
              handleAdd={() => handleAddToOrder(main)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
