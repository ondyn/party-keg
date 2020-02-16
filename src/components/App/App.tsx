import React from 'react';
import State from '../../context/state'
import MainRouter from '../Router/Router';

const App: React.FC = () => {
  // Find the right method, call on correct element
  // function launchFullScreen(element:any) {
  //   if(element.requestFullScreen) {
  //     element.requestFullScreen();
  //   } else if(element.mozRequestFullScreen) {
  //     element.mozRequestFullScreen().catch((err:any) => {
  //       alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
  //     });
  //   } else if(element.webkitRequestFullScreen) {
  //     element.webkitRequestFullScreen();
  //   }
  // }

  // Launch fullscreen for browsers that support it!
  // launchFullScreen(document.documentElement); // the whole page

  return (
    <State>
      <MainRouter />
    </State>
  );
};

export default App;
