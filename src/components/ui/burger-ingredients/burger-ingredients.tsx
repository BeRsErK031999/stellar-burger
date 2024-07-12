// src/components/ui/burger-ingredients/burger-ingredients.tsx

import React, { FC } from 'react';
import { TIngredient, TTabMode } from '@utils-types';
import styles from './burger-ingredients.module.css';

interface BurgerIngredientsProps {
  currentTab: TTabMode;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  titleBunRef: React.RefObject<HTMLHeadingElement>;
  titleMainRef: React.RefObject<HTMLHeadingElement>;
  titleSaucesRef: React.RefObject<HTMLHeadingElement>;
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
}) => (
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
          <div key={bun._id} className={styles.ingredientCard}>
            <img
              src={bun.image}
              alt={bun.name}
              className={styles.ingredientImage}
            />
            <p className={styles.price}>{bun.price}</p>
            <p className={styles.ingredientName}>{bun.name}</p>
            <button className={styles.addButton}>+ Добавить</button>
          </div>
        ))}
      </div>
      <h2 ref={titleMainRef}>Начинки</h2>
      <div ref={mainsRef} className={styles.ingredientsGrid}>
        {mains.map((main) => (
          <div key={main._id} className={styles.ingredientCard}>
            <img
              src={main.image}
              alt={main.name}
              className={styles.ingredientImage}
            />
            <p className={styles.price}>{main.price}</p>
            <p className={styles.ingredientName}>{main.name}</p>
            <button className={styles.addButton}>+ Добавить</button>
          </div>
        ))}
      </div>
      <h2 ref={titleSaucesRef}>Соусы</h2>
      <div ref={saucesRef} className={styles.ingredientsGrid}>
        {sauces.map((sauce) => (
          <div key={sauce._id} className={styles.ingredientCard}>
            <img
              src={sauce.image}
              alt={sauce.name}
              className={styles.ingredientImage}
            />
            <p className={styles.price}>{sauce.price}</p>
            <p className={styles.ingredientName}>{sauce.name}</p>
            <button className={styles.addButton}>+ Добавить</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
