import { FC, useEffect, useState } from 'react';
import { FeedUI } from '@components';
import { TOrder } from '@utils-types';
import { Preloader } from '@components';

export const Feed: FC = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetFeeds = () => {
    // Логика получения данных, например, запрос к API
    setOrders([]); // Установите полученные заказы
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
