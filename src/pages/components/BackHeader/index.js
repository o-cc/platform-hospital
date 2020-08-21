import React from 'react';
import { Grid, IconButton, makeStyles, Divider } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import useWidth from '@/hooks/useWidth';

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    fontSize: 17,
    background: '#fff'
  },
  withoutHome: {
    visibility: 'hidden',
    pointerEvents: 'none'
  },
  central: {
    maxWidth: 1000,
    margin: 'auto'
  }
}));

export default withRouter(
  ({ withoutHome = false, homeComponent: Home, ...props }) => {
    const classes = useStyles();
    const width = useWidth();
    return (
      <Grid
        item
        xs={12}
        className={classes.header}
        style={{
          background: props.bgColor,
          minWidth: width === 'xs' ? undefined : 1000
        }}
      >
        <Grid container className={classes.central} justify="space-between">
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
