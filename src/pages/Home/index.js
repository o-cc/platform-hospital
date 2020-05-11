import React from 'react';
import Nav from './components/Header/Nav';
// import SubTabs from './components/SubTabs';
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import Home from './Child/Default';

function Child() {
  let { menuType } = useParams();
  console.log(menuType);
  return <h3 style={{ marginTop: 100 }}>{menuType}</h3>;
}
export default props => {
  const { path } = useRouteMatch();
  return (
    <>
      <Nav {...props}></Nav>
      <Switch>
        <Route exact path={path}>
          <Home />
        </Route>
        <Route path={`${path}:menuType`}>
          <Child />
        </Route>
      </Switch>
    </>
  );
};
