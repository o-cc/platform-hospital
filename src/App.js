import React, { lazy, Suspense } from 'react';
import './App.css';
import 'swiper/css/swiper.css';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom';
import AppCont from 'container';
import 'tools/vconsole';
import Loading from 'pages/components/Loading';

const Home = lazy(() => import('pages/Home'));
const Detail = lazy(() => import('pages/Detail'));
const Login = lazy(() => import('pages/Login'));
const User = lazy(() => import('pages/User'));
const VideoDetail = lazy(() => import('pages/VideoDetail'));
const Other = lazy(() => import('pages/Others'));
const Store = lazy(() => import('pages/Store'));
const StorePC = lazy(() => import('pages/Store/Detail/PC'));
const Member = lazy(() => import('pages/Member'));
const Search = lazy(() => import('pages/Search'));
const Collect = lazy(() => import('pages/Collect'));
const Error = lazy(() => import('pages/Error'));
const Article = lazy(() => import('pages/Member/components/MyArticle/Editor'));
const Video = lazy(() => import('pages/Member/components/Video'));
const Online = lazy(() => import('pages/Online'));

const Root = withRouter(props => {
  const appCont = AppCont.useContainer();
  const { error } = appCont;

  // useEffect(() => {
  //   console.log(props.location.pathname);
  // }, [props.location.pathname]);

  return (
    <Suspense fallback={<Loading></Loading>}>
      {error.error && <Error info={error} />}
      <Route path="/login" component={Login}></Route>
      <Route exact path="/" component={Home}></Route>
      <Route path="/detail/:id" component={Detail}></Route>
      <Route path="/user/:id" component={User}></Route>
      <Route exact path={`/other/:id`} component={Other}></Route>
      <Route exact path={`/video/detail/:id`} component={VideoDetail}></Route>
      <Route exact path={`/store`} component={Store}></Route>
      <Route exact path={`/store/PC/:id`} component={StorePC}></Route>
      <Route path={`/member/`} component={Member}></Route>
      <Route path={'/search'} component={Search}></Route>
      <Route path={'/collect/:id'} component={Collect}></Route>
      <Route path={'/upload-video'} component={Video}></Route>
      <Route path={'/write'} component={Article}></Route>
      <Route path={'/online'} component={Online}></Route>
    </Suspense>
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
