import React from 'react';
import State from '../../context/state'
import MainRouter from '../Router/Router';
import { AppProvider } from '../../context/Ctx';

const App: React.FC = () => (
  <State>
    <MainRouter />
  </State>
);

export default App;
