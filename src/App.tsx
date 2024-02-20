import './App.css';
import '@neo4j-ndl/base/lib/neo4j-ds-styles.css';

import ThemeWrapper from './context/ThemeWrapper';
import QuickStarter from './templates/og/QuickStarter';
import ECommerce from './templates/ecommerce/Home';
import Movie from './templates/movie/Home';
import Cybersecurity from './templates/cybersecurity/Home';
import Home from './landingPage/Home';
import PageNotFoundPage from './templates/shared/components/PageNotFoundPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConnectionModal from './templates/shared/components/ConnectionModal';
import Chatbot from './templates/shared/components/Chatbot';
import messagesData from './templates/shared/components/ChatbotMessages.json';
import Header from './templates/shared/components/Header';
import { useState } from 'react';
import User from './templates/shared/components/User';

function App() {
  const messages = messagesData.listMessages;
  const [activeTab, setActiveTab] = useState<string>('Home');
  return (
    <BrowserRouter>
      <ThemeWrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/og-preview' element={<QuickStarter />} />
          <Route path='/ecommerce-preview' element={<ECommerce />} />
          <Route path='/movie-preview' element={<Movie />} />
          <Route path='/cybersecurity-preview' element={<Cybersecurity />} />
          <Route
            path='/connection-modal-preview'
            element={<ConnectionModal open={true} setOpenConnection={() => null} setConnectionStatus={() => null} />}
          />
          <Route path='/chat-widget-preview' element={<Chatbot messages={messages} />} />
          <Route
            path='/header-preview'
            element={
              <Header
                title='Header Component'
                navItems={['Home', 'Tab1', 'TabX']}
                useNeo4jConnect={false}
                activeNavItem={activeTab}
                setActiveNavItem={setActiveTab}
              />
            }
          />
          <Route
            path='/user-preview'
            element={<User />}
          />
          <Route path='*' element={<PageNotFoundPage />} />
        </Routes>
      </ThemeWrapper>
    </BrowserRouter>
  );
}

export default App;
