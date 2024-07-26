import { TOrder } from '../../utils/types';

const URL = process.env.BURGER_API_URL;

type TOrdersResponse = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const fetchOrdersApi = async (): Promise<TOrdersResponse> => {
  const response = await fetch(`${URL}/orders/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
};
