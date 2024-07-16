import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  setSelectedIngredient
} from '../../services/slices/ingredientsSlice';
import { RootState } from '../../services/store';
import styles from './ingredient-details.module.css';
import { TIngredient } from '../../utils/types';

interface IngredientDetailsProps {
  ingredient?: TIngredient;
}

const IngredientDetails: FC<IngredientDetailsProps> = ({ ingredient }) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );
  const selectedIngredient =
    ingredient || ingredients.find((item) => item._id === id);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
    if (selectedIngredient && !ingredient) {
      dispatch(setSelectedIngredient(selectedIngredient));
    }
  }, [id, dispatch, ingredients, selectedIngredient, ingredient]);

  if (!selectedIngredient) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.details}>
      <img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
      <h3>{selectedIngredient.name}</h3>
      <ul>
        <li>Calories: {selectedIngredient.calories}</li>
        <li>Proteins: {selectedIngredient.proteins}</li>
        <li>Fat: {selectedIngredient.fat}</li>
        <li>Carbohydrates: {selectedIngredient.carbohydrates}</li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
