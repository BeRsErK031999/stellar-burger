import { ReactNode } from 'react';

export type TModalProps = {
  title?: string; // Сделаем заголовок необязательным
  onClose: () => void;
  children?: ReactNode;
  width?: string; // Добавим пропсы для ширины и высоты
  height?: string;
};
