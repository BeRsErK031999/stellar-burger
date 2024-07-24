// src/components/ui/burger-ingredient/type.ts
import { TIngredient } from '@utils-types';

export interface TBurgerIngredientUIProps {
  ingredient: TIngredient;
  count: number;
  locationState: any;
  handleAdd: () => void;
}

export interface TBurgerIngredientProps {
  ingredient: TIngredient;
  count: number;
}
