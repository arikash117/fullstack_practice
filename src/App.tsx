import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ContextPage } from './pages/ContextPage';
import { ReduxPage } from './pages/ReduxPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/context" element={<ContextPage />} />
        <Route path="/redux" element={<ReduxPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;