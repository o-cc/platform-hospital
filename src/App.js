import React from 'react';
import './App.css';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom';
import Login from 'pages/Login';
import Home from 'pages/Home';
import AppCont from 'container';
import Detail from 'pages/Detail';
import User from 'pages/User';
import Other from '@/pages/Others';
import PageTemplate from './pages/components/PageTemplate';

function OtherWrap() {
  return (
    <PageTemplate>
      <Other />
    </PageTemplate>
  );
}
const Root = withRouter(props => {
  return (
    <>
      <Route path="/login" component={Login}></Route>
      <Route exact path="/" component={Home}></Route>
      <Route path="/detail/:id" component={Detail}></Route>
      <Route path="/user/:id" component={User}></Route>
      <Route exact path={`/other/:menuType`} component={OtherWrap}></Route>
    </>
  );
});
function App() {
  return (
    <AppCont.Provider>
      <Router>
        <Root></Root>
      </Router>
    </AppCont.Provider>
  );
}

export default App;
