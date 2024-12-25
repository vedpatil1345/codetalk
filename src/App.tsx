
import { Route, Routes } from 'react-router-dom';

import  HomePage  from './components/HomePage.tsx';
import  CodePage  from './components/CodePage.tsx';

import { AuthProvider } from './components/auth/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/code" element={<CodePage />} />
      </Routes>
    </AuthProvider>
  );
};
export default App;