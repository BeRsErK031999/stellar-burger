import { createSelector } from 'reselect';
import { RootState } from '../store'; // Убедитесь, что путь к вашему store правильный

const selectIngredients = (state: RootState) => state.ingredients.items;

export const selectBuns = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === 'bun')
);

export const selectMains = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === 'main')
);

export const selectSauces = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === 'sauce')
);
