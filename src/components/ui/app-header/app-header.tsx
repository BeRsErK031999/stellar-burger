// src/components/ui/app-header/app-header.tsx
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <Link to='/' className={`${styles.link} p-4`}>
          <BurgerIcon type='primary' />
          <span className='text text_type_main-default ml-2'>Конструктор</span>
        </Link>
        <Link to='/feed' className={`${styles.link} p-4 ml-2`}>
          <ListIcon type='secondary' />
          <span className='text text_type_main-default ml-2'>
            Лента заказов
          </span>
        </Link>
      </div>
      <div className={styles.logo}>
        <Logo className={styles.logo} />
      </div>
      <div className={styles.link_position_last}>
        <Link to='/profile' className={`${styles.link} p-4`}>
          <ProfileIcon type='secondary' />
          <span className='text text_type_main-default ml-2'>{userName}</span>
        </Link>
      </div>
    </nav>
  </header>
);
