import React from 'react';
import State from '../../context/state'
import MainRouter from '../Router/Router';
import { AppProvider } from '../../context/Ctx';

const App: React.FC = () => (
  <State>
    <AppProvider>
      <MainRouter />
    </AppProvider>
  </State>
);

export default App;
