import React, { FC, forwardRef } from 'react';
import { TIngredient } from '@utils-types';
import styles from './ingredients-category.module.css';

interface IngredientsCategoryProps {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
}

export const IngredientsCategory = forwardRef<
  HTMLDivElement,
  IngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => (
  <div className={styles.category} ref={ref}>
    <h2 ref={titleRef} className='text text_type_main-medium'>
      {title}
    </h2>
    <div className={styles.items}>
      {ingredients.map((ingredient) => (
        <div key={ingredient._id} className={styles.item}>
          <img src={ingredient.image} alt={ingredient.name} />
          <p>{ingredient.name}</p>
        </div>
      ))}
    </div>
  </div>
));
