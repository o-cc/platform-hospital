import React from 'react';
import { Grid, IconButton, makeStyles, Divider } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    fontSize: 17,
    background: '#fff'
  },
  withoutHome: {
    visibility: 'hidden',
    pointerEvents: 'none'
  }
}));

export default withRouter(
  ({ withoutHome = false, homeComponent: Home, ...props }) => {
    const classes = useStyles();
    return (
      <Grid
        item
        xs={12}
        className={classes.header}
        style={{ background: props.bgColor }}
      >
        <Grid container justify="space-between">
          <Grid item>
            <IconButton
              onClick={() => {
                if (props.back) return props.back();
                props.history.go && props.history.go(-1);
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" style={{ height: '100%' }}>
              {props.title}
            </Grid>
          </Grid>
          <Grid item>
            {Home ? (
              <Home />
            ) : (
              <IconButton
                className={withoutHome ? classes.withoutHome : ''}
                onClick={() => props.history && props.history.push('/')}
              >
                <HomeOutlinedIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    );
  }
);
