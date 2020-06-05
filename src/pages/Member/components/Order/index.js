import React from 'react';
import Slider from 'pages/components/Slider';
import { Grid, makeStyles, Typography, Paper } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'hidden'
  },
  img: {
    maxWidth: '100%',
    height: 'auto'
  },
  paper: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(2, 0, 0),
    '& .span': {
      color: '#f30'
    }
  },
  info: {
    height: '100%',
    paddingLeft: theme.spacing(1)
  }
}));
export default props => {
  const classes = useStyles();

  return (
    <Slider open={props.open}>
      <Grid container spacing={1} className={classes.root}>
        <BackHeader back={props.onClose} title="订单中心" />
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" className={classes.paper}>
            <Typography variant="subtitle2" color="textSecondary">
              订单编号：<span className="span">91928283</span>
            </Typography>
            <Grid container className={classes.order}>
              <Grid item xs={4}>
                <img
                  src={require('assets/imgs/test_books.jpg')}
                  alt="订单图"
                  className={classes.img}
                />
              </Grid>
              <Grid item xs={8}>
                <Grid container justify="space-around" className={classes.info}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid item>我是湛江猪脚煲汤</Grid>
                      <Grid item>
                        <Typography variant="body2" color="textPrimary">
                          x 3
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid item>
                        <Typography variant="body2" color="textPrimary">
                          <span className="span">积分: 1999</span>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="secondary">
                          待发货
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" className={classes.paper}>
            <Typography variant="subtitle2" color="textSecondary">
              订单编号：<span className="span">91928283</span>
            </Typography>
            <Grid container className={classes.order}>
              <Grid item xs={4}>
                <img
                  src={require('assets/imgs/test_books.jpg')}
                  alt="订单图"
                  className={classes.img}
                />
              </Grid>
              <Grid item xs={8}>
                <Grid container justify="space-around" className={classes.info}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid item>我是湛江猪脚煲汤</Grid>
                      <Grid item>
                        <Typography variant="body2" color="textPrimary">
                          x 3
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid item>
                        <Typography variant="body2" color="textPrimary">
                          <span className="span">积分: 1999</span>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="secondary">
                          待发货
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" className={classes.paper}>
            <Typography variant="subtitle2" color="textSecondary">
              订单编号：<span className="span">91928283</span>
            </Typography>
            <Grid container className={classes.order}>
              <Grid item xs={4}>
                <img
                  src={require('assets/imgs/test_books.jpg')}
                  alt="订单图"
                  className={classes.img}
                />
              </Grid>
              <Grid item xs={8}>
                <Grid container justify="space-around" className={classes.info}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid item>我是湛江猪脚煲汤</Grid>
                      <Grid item>
                        <Typography variant="body2" color="textPrimary">
                          x 3
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid item>
                        <Typography variant="body2" color="textPrimary">
                          <span className="span">积分: 1999</span>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="secondary">
                          待发货
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Slider>
  );
};
