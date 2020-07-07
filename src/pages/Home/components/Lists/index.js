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
  },
  text: {
    padding: `${theme.spacing(0.5)}px 0`
  }
}));

export default withRouter(function ListDividers(props) {
  const classes = useStyles();
  const { lists } = props;
  return (
    <List
      component="nav"
      className={classes.root}
      style={{ paddingBottom: 0 }}
      aria-label="mailbox folders"
    >
      {lists.map((item, idx) => (
        <Fragment key={idx}>
          <ListItem
            button
            onClick={() => {
              if (item.url) window.location.href = item.url;
            }}
          >
            <ListItemText className={classes.text} primary={item.title} />
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
});
