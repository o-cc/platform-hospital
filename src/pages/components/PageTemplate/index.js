import React from 'react';
import Nav from 'pages/components/Header/Nav';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: '#606060',
    color: '#fff'
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    // left: 0
  }
}));

export default props => {
  const classes = useStyles();

  return (
    <>
      <Nav {...props}></Nav>
      {props.children}
      {/* footer */}
      <div style={{ width: '100%', height: '5px' }}></div>
      <Hidden smUp>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body2" align="center">
              {'Copyright © '}
              <Link color="inherit" href="#">
                Company Website
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Container>
        </footer>
      </Hidden>
    </>
  );
};
