import React from 'react';
import Nav from './components/Header/Nav';
// import SubTabs from './components/SubTabs';
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import Home from './Child/Default';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: '#606060',
    color: '#fff'
  }
}));

function Child() {
  let { menuType } = useParams();
  return <h3 style={{ marginTop: 100 }}>{menuType}</h3>;
}
export default props => {
  const { path } = useRouteMatch();
  const classes = useStyles();

  return (
    <>
      <Nav {...props}></Nav>
      <Switch>
        <Route exact path={path}>
          <Home />
        </Route>
        <Route path={`${path}:menuType`}>
          <Child />
        </Route>
      </Switch>
      {/* footer */}
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          {/* <Typography variant="body1"></Typography> */}
          <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              Company Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </footer>
    </>
  );
};
