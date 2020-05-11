import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ListDividers() {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification." />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification." />
      </ListItem>
      <ListItem button>
        <ListItemText primary="In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification." />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="In a list, you should ensure the Divider is rendered as an <li> to match the HTML5 specification." />
      </ListItem>
    </List>
  );
}
