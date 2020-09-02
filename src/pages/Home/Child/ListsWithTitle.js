import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Link } from '@material-ui/core';
import ItemList from 'pages/components/ListItem';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
    '& > *': {
      width: '100%',
      borderRadius: 0
    },
    '& .MuiGrid-grid-xs-8': {
      paddingRight: 0
    }
  },
  paper: {
    width: '100%',
    overflow: 'hidden',
    background: '#fff'
  },
  subTitle: {
    color: '#a6a6a6',
    fontSize: 16
  },
  more: {
    color: '#a6a6a6',
    fontSize: 14
  }
}));

function SimplePaper({ listItem, ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ background: '#fff', padding: `0 16px` }}
        >
          <h4 className={classes.subTitle}>{listItem.name}</h4>
          <Link
            href="#"
            className={classes.more}
            onClick={e => {
              e.preventDefault();
              props.history && props.history.push(`/other/${listItem.id}`);
            }}
          >
            查看更多
          </Link>
        </Grid>
        {/* <Divider variant="middle" /> */}
        <ItemList list={listItem.news} />
      </Paper>
    </div>
  );
}

SimplePaper.defaultProps = {
  listItem: {
    news: []
  }
};

export default withRouter(SimplePaper);
