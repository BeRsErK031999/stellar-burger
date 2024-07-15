import React, { FC } from 'react';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import styles from './ingredient-details.module.css';

const IngredientDetails: FC = () => {
  const ingredient = useSelector(
    (state: RootState) => state.ingredients.selectedIngredient
  );

  if (!ingredient) return null;

  return (
    <div className={styles.details}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h3>{ingredient.name}</h3>
      <ul>
        <li>Calories: {ingredient.calories}</li>
        <li>Proteins: {ingredient.proteins}</li>
        <li>Fat: {ingredient.fat}</li>
        <li>Carbohydrates: {ingredient.carbohydrates}</li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
