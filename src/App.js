import React from 'react';
import './App.css';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom';
import Login from 'pages/Login';
import Home from 'pages/Home';
import AppCont from 'container';
import Detail from 'pages/Detail';
import User from 'pages/User';
import Other from '@/pages/Others';
import VideoDetail from '@/pages/VideoDetail';
import PageTemplate from './pages/components/PageTemplate';
import Store from '@/pages/Store';
import StoreDetail from '@/pages/Store/Detail';
import StoreExchange from '@/pages/Store/Exchange';
import 'tools/vconsole';
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
      <Route exact path={`/video/detail/:id`} component={VideoDetail}></Route>
      <Route exact path={`/store`} component={Store}></Route>
      <Route exact path={`/store/detail/:id`} component={StoreDetail}></Route>
      <Route path={`/store/exchange/:id`} component={StoreExchange}></Route>
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
