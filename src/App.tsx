
import { Route, Routes } from 'react-router-dom';

import  {HomePage}  from './components/HomePage.tsx';
import  CodePage  from './components/CodePage.tsx';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/code" element={<CodePage />} />
    </Routes>
  );
};

export default App;