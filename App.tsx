
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './app/router';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="h-screen w-screen flex flex-col font-sans text-slate-900 overflow-hidden">
        <AppRouter />
      </div>
    </HashRouter>
  );
};

export default App;
