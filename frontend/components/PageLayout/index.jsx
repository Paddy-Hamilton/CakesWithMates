import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../Nav';
import Header from '../Header';

const PageLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header name="Cakes with mates">
        <Nav />
      </Header>
      {children}
    </React.Fragment>
  );
};

export default PageLayout;
