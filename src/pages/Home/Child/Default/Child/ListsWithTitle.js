import React, { Fragment } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Divider, Link } from '@material-ui/core';
import { vw } from '@/utils';

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
  gridItem: {
    padding: theme.spacing(2),
    paddingRight: 0,
    paddingBottom: 0,
    color: theme.palette.text.secondary
  },
  imgItem: {
    height: theme.spacing(18)
  },
  gridWrap: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    alignItems: 'center',
    paddingRight: theme.spacing(1)
  },
  more: {
    color: '#a6a6a6',
    paddingRight: theme.spacing(2),
    fontSize: vw(25)
  }
}));

const Img = styled(({ bg, ...other }) => <Paper {...other} />)({
  height: '100%',
  padding: 0,
  background: bg => {
    return bg.bg === 'red'
      ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)';
  }
});

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
        {listItem.list.map((item, idx) => (
          <Fragment key={idx}>
            <Grid container spacing={3} className={classes.gridWrap}>
              <Grid item xs={8}>
                <Paper elevation={0} className={classes.gridItem}>
                  {item.text}
                  <h5>{item.time}</h5>
                </Paper>
              </Grid>

              <Grid item xs className={classes.imgItem}>
                <Img bg={idx % 2 === 0 && 'red'}></Img>
              </Grid>
            </Grid>
            <Divider />
          </Fragment>
        ))}
      </Paper>
    </div>
  );
}

SimplePaper.defaultProps = {
  listItem: {
    list: []
  }
};
