import { FC, memo } from 'react';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import styles from '../ui/order-card/order-card.module.css';

export const OrderCard: FC<{ order: any }> = memo(({ order }) => {
  const { bun, ingredients } = useSelector((state: RootState) => state.order);

  return (
    <div className={styles.orderCard}>
      {bun && (
        <div className={styles.ingredient}>
          <img src={bun.image_mobile} alt={bun.name} />
          <p>{bun.name}</p>
        </div>
      )}
      {ingredients.map((ingredient) => (
        <div key={ingredient._id} className={styles.ingredient}>
          <img src={ingredient.image_mobile} alt={ingredient.name} />
          <p>{ingredient.name}</p>
        </div>
      ))}
    </div>
  );
});
