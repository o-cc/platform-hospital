import React from 'react';
import './App.css';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom';
import Login from 'pages/Login';
import Home from 'pages/Home';

const Root = withRouter(props => {
  return (
    <>
      <Route path="/login" component={Login}></Route>
      <Route path="/" component={Home}></Route>
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
