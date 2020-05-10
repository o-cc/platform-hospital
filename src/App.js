import React from 'react';
import './App.css';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom';
import Login from 'pages/Login';
import Home from 'pages/Home';
import AppCont from 'container';

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
    <AppCont.Provider>
      <Router>
        <Root></Root>
      </Router>
    </AppCont.Provider>
  );
}

export default App;
