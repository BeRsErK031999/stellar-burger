import React, { FC } from 'react';
import styles from './modal.module.css';

type ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalUI: FC<ModalProps> = ({ title, onClose, children }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h2>{title}</h2>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
      </div>
      <div className={styles.modalBody}>{children}</div>
    </div>
  </div>
);
