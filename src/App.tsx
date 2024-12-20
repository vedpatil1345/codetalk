
import { Route, Routes } from 'react-router-dom';

import { Page } from './components/Page';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
    </Routes>
  );
};

export default App;