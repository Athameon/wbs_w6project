import React from 'react';
import News from './News';
import Author from './Author';
import Crypto from './Crypto';
import { Switch, Route } from 'react-router-dom';
import './Main.css';

const Main = ({ content, currentData }) => {
  console.log(content.items);
  return (
    <main className="mainWidth center">
      <Switch>
        <Route path="/authors/:name">
          <Author />
        </Route>
        <Route path="/crypto/:id">
          <Crypto currentData={currentData} />
        </Route>
        <Route path="/">
          <News {...content} />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
