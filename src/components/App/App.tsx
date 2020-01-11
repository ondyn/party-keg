import React from 'react';
import State from '../../context/state'
import MainRouter from '../Router/Router';

const App: React.FC = () => (
  <State>
    <MainRouter />
  </State>
);

export default App;
