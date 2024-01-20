import './App.css';
import '@neo4j-ndl/base/lib/neo4j-ds-styles.css';

import ThemeWrapper from './context/ThemeWrapper';
import QuickStarter from './templates/og/QuickStarter';
import Home from './landingPage/Home';
import NotFoundPage from './landingPage/NotFoundPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConnectionModal from './templates/shared/components/ConnectionModal';
import Chatbot from './templates/shared/components/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <ThemeWrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/og-preview' element={<QuickStarter />} />
          <Route
            path='/connection-modal-preview'
            element={<ConnectionModal open={true} setOpenConnection={() => null} setConnectionStatus={() => null} />}
          />
          <Route path='/chat-widget-preview' element={<Chatbot />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </ThemeWrapper>
    </BrowserRouter>
  );
}

export default App;
