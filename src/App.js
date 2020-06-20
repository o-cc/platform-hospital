import React from 'react';
import './App.css';
import 'swiper/css/swiper.css';
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
import Member from '@/pages/Member';
import 'tools/vconsole';
import Search from 'pages/Search';
import Error from 'pages/Error';
function OtherWrap() {
  return (
    <PageTemplate>
      <Other />
    </PageTemplate>
  );
}
const Root = withRouter(props => {
  const appCont = AppCont.useContainer();
  const { error } = appCont;
  return (
    <>
      {error.error && <Error info={error} />}

      <Route path="/login" component={Login}></Route>
      <Route exact path="/" component={Home}></Route>
      <Route path="/detail/:id" component={Detail}></Route>
      <Route path="/user/:id" component={User}></Route>
      <Route exact path={`/other/:id`} component={OtherWrap}></Route>
      <Route exact path={`/video/detail/:id`} component={VideoDetail}></Route>
      <Route exact path={`/store`} component={Store}></Route>
      <Route path={`/member/`} component={Member}></Route>
      <Route path={'/search'} component={Search}></Route>
    </>
  );
});
function App() {
  return (
    <AppCont.Provider>
      <Router>
        <Root />
      </Router>
    </AppCont.Provider>
  );
}

export default App;
