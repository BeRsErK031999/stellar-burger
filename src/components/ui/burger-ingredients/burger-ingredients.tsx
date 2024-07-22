// src/components/ui/burger-ingredients/burger-ingredients.tsx
import React, { FC } from 'react';
import { useDispatch, useSelector } from '../../../services/store';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient, TTabMode } from '@utils-types';
import styles from './burger-ingredients.module.css';
import { addIngredient } from '../../../services/slices/orderSlice';
import { setSelectedIngredient } from '../../../services/slices/ingredientsSlice';
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

  const handleImageClick = (ingredient: TIngredient) => {
    dispatch(setSelectedIngredient(ingredient));
  };

  return (
    <div className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <li>
            <button
              onClick={() => onTabClick('bun')}
              className={`${styles.tab} ${currentTab === 'bun' ? styles.active : ''}`}
            >
              Булки
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabClick('main')}
              className={`${styles.tab} ${currentTab === 'main' ? styles.active : ''}`}
            >
              Начинки
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabClick('sauce')}
              className={`${styles.tab} ${currentTab === 'sauce' ? styles.active : ''}`}
            >
              Соусы
            </button>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        <h2 ref={titleBunRef}>Булки</h2>
        <div ref={bunsRef} className={styles.ingredientsGrid}>
          {buns.map((bun) => (
            <BurgerIngredientUI
              key={bun._id}
              ingredient={bun}
              count={ingredientCounts[bun._id] || 0}
              locationState={{ background: location }} // Pass locationState
              handleAdd={() => handleAddToOrder(bun)}
            />
          ))}
        </div>
        <h2 ref={titleMainRef}>Начинки</h2>
        <div ref={mainsRef} className={styles.ingredientsGrid}>
          {mains.map((main) => (
            <BurgerIngredientUI
              key={main._id}
              ingredient={main}
              count={ingredientCounts[main._id] || 0}
              locationState={{ background: location }} // Pass locationState
              handleAdd={() => handleAddToOrder(main)}
            />
          ))}
        </div>
        <h2 ref={titleSaucesRef}>Соусы</h2>
        <div ref={saucesRef} className={styles.ingredientsGrid}>
          {sauces.map((sauce) => (
            <BurgerIngredientUI
              key={sauce._id}
              ingredient={sauce}
              count={ingredientCounts[sauce._id] || 0}
              locationState={{ background: location }} // Pass locationState
              handleAdd={() => handleAddToOrder(sauce)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
