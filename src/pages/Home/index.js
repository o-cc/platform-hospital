import React from 'react';
import Nav from './components/Header/Nav';
// import SubTabs from './components/SubTabs';
// import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Home from './components/Home';
export default props => {
  // let { path } = useRouteMatch();
  // console.log(path);
  return (
    <>
      <Nav {...props}></Nav>
      <Home />
    </>
  );
};
