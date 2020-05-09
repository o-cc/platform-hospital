import React from 'react';
import './App.css';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom';
import Login from 'pages/Login';
// import Test from 'test/index';

const Root = withRouter(props => {
  return (
    <>
      <Route path="/" component={Login}></Route>
    </>
  );
});
function App() {
  return (
    <Router>
      <Root></Root>
    </Router>
  );
}

export default App;
