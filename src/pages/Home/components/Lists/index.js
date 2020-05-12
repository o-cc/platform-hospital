import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    '& .MuiListItem-root': {
      paddingTop: 0,
      paddingBottom: 0
    }
  }
}));

export default withRouter(function ListDividers(props) {
  const classes = useStyles();
  const { lists, history } = props;
  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {lists.map((item, idx) => (
        <Fragment key={idx}>
          <ListItem
            button
            onClick={() => {
              history.push('/column');
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
});
