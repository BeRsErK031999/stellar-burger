import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { ConstructorPage } from '../../pages/constructor-page/constructor-page';

const App = () => (
  <Router>
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        {/* Другие маршруты */}
      </Routes>
    </div>
  </Router>
);

export default App;
