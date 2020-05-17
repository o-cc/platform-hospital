import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Divider, Link } from '@material-ui/core';
import { vw } from '@/utils';
import ItemList from 'pages/components/ListItem';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1.5),
    '& > *': {
      margin: theme.spacing(0.5),
      width: theme.spacing(16)
    },

    '& .MuiGrid-grid-xs-8': {
      paddingRight: 0
    }
  },
  paper: {
    width: '100%',
    overflow: 'hidden'
  },
  subTitle: {
    color: 'rgba(198,40, 40, 0.9)',
    margin: theme.spacing(2)
  },
  more: {
    color: '#a6a6a6',
    paddingRight: theme.spacing(2),
    fontSize: vw(25)
  }
}));

export default function SimplePaper({ listItem }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <Grid container justify="space-between" alignItems="center">
          <h4 className={classes.subTitle}>{listItem.title}</h4>
          <Link href="#" className={classes.more} onClick={() => {}}>
            查看更多
          </Link>
        </Grid>
        <Divider />
        <ItemList list={listItem.list} />
      </Paper>
    </div>
  );
}

SimplePaper.defaultProps = {
  listItem: {
    list: []
  }
};
