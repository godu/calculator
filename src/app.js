import React from 'react';
import logo from './logo.svg';
import style from './app.css';

const App = () => (
  <div className={style.App}>
    <header className={style.Header}>
      <img src={logo} className={style.Logo} alt="logo" />
      <h1 className={style.Title}>Welcome to React</h1>
    </header>
    <p className={style.Intro}>
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);

export default App;
