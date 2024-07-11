import React, { FC, useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { TIngredient, TTabMode } from '@utils-types';
import styles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import {
  selectBuns,
  selectMains,
  selectSauces
} from '../../services/selectors/ingredientsSelectors';
import { BurgerIngredients as BurgerIngredientsUI } from '../../components/ui/burger-ingredients';
interface BurgerIngredientsProps {
  items: TIngredient[];
}

const BurgerIngredients: FC<BurgerIngredientsProps> = () => {
  const buns = useSelector(selectBuns);
  const mains = useSelector(selectMains);
  const sauces = useSelector(selectSauces);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const bunsRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);

  const { ref: bunsInViewRef, inView: inViewBuns } = useInView({
    threshold: 0
  });

  const { ref: mainsInViewRef, inView: inViewFilling } = useInView({
    threshold: 0
  });

  const { ref: saucesInViewRef, inView: inViewSauces } = useInView({
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

  console.log('Buns: ', buns);
  console.log('Mains: ', mains);
  console.log('Sauces: ', sauces);

  useEffect(() => {
    bunsInViewRef(bunsRef.current);
    mainsInViewRef(mainsRef.current);
    saucesInViewRef(saucesRef.current);
  }, [bunsInViewRef, mainsInViewRef, saucesInViewRef]);

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};

export default BurgerIngredients;
