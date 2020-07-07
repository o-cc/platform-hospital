import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Divider, Link } from '@material-ui/core';
import ItemList from 'pages/components/ListItem';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1.5, 0),
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
    background: 'none'
  },
  subTitle: {
    color: 'rgba(198,40, 40, 0.9)',
    margin: theme.spacing(2)
  },
  more: {
    color: '#a6a6a6',
    paddingRight: theme.spacing(2),
    fontSize: theme.spacing(2)
  }
}));

function SimplePaper({ listItem, ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.paper}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ background: '#fff' }}
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
        <Divider />
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
