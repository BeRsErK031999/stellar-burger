import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { TTabMode, TIngredient } from '@utils-types';

interface BurgerIngredientsProps {
  items: TIngredient[];
}

export const BurgerIngredients: FC<BurgerIngredientsProps> = ({ items }) => {
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const buns = items.filter(item => item.type === 'bun');
  const mains = items.filter(item => item.type === 'main');
  const sauces = items.filter(item => item.type === 'sauce');

  return (
    <div>
      <div>
        <h1>Соберите бургер</h1>
        <div>
          <button onClick={() => onTabClick('bun')}>Булки</button>
          <button onClick={() => onTabClick('sauce')}>Соусы</button>
          <button onClick={() => onTabClick('main')}>Начинки</button>
        </div>
      </div>
      <div>
        <h2 ref={titleBunRef}>Булки</h2>
        <div ref={bunsRef}>
          {buns.map(bun => (
            <div key={bun._id}>{bun.name}</div>
          ))}
        </div>
        <h2 ref={titleSaucesRef}>Соусы</h2>
        <div ref={saucesRef}>
          {sauces.map(sauce => (
            <div key={sauce._id}>{sauce.name}</div>
          ))}
        </div>
        <h2 ref={titleMainRef}>Начинки</h2>
        <div ref={mainsRef}>
          {mains.map(main => (
            <div key={main._id}>{main.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
