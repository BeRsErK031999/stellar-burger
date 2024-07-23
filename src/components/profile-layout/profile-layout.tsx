import { FC, ReactNode } from 'react';
import styles from './profile-layout.module.css';
import { ProfileMenuUI } from '../ui/profile-menu/profile-menu';
import { useLocation } from 'react-router-dom';

interface ProfileLayoutProps {
  children: ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  const location = useLocation();

  const handleLogout = () => {
    // Реализуйте логику выхода из системы
  };

  return (
    <div className={styles.profileLayout}>
      <ProfileMenuUI pathname={location.pathname} handleLogout={handleLogout} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default ProfileLayout;
