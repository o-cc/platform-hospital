import React from 'react';
import Nav from './../components/Nav';
export default props => {
  return (
    <>
      <Nav login={() => props.history.push('/login')}></Nav>
    </>
  );
};
