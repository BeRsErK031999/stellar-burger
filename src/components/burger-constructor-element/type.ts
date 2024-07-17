import { TConstructorIngredient } from '@utils-types';

export type BurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  onRemove: () => void;
  onMoveUp: () => void; // Добавлено
  onMoveDown: () => void; // Добавлено
};
