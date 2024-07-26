import { FC, memo, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from '../ui/modal/modal.module.css'; // Обновленный путь

import { TModalProps } from './type';
import { ModalUI } from '@ui';

const modalRoot = document.getElementById('modals');

export const ModalWrapper: FC<TModalProps> = memo(
  ({ title, onClose, children, width = 'auto', height = 'auto' }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);

    return ReactDOM.createPortal(
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={styles.modal}
          ref={modalRef}
          style={{ width, height }}
          onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри модального окна
        >
          <ModalUI title={title || ''} onClose={onClose}>
            {children}
          </ModalUI>
        </div>
      </div>,
      modalRoot as HTMLDivElement
    );
  }
);

export default ModalWrapper;
