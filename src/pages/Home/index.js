import React from 'react';
import Nav from './components/Header/Nav';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Default from './Child/Default';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Other from './Child/Others';
const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: '#606060',
    color: '#fff'
  }
}));

export default props => {
  const { path } = useRouteMatch();
  const classes = useStyles();

  return (
    <>
      <Nav {...props}></Nav>
      <Switch>
        <Route exact path={path}>
          <Default />
        </Route>
        <Route path={`${path}:menuType`}>
          <Other />
        </Route>
        <Route path={`${path}column:id`}>
          <h2>column</h2>
        </Route>
      </Switch>
      {/* footer */}
      <footer className={classes.footer}>
        <Container maxWidth="sm">
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
