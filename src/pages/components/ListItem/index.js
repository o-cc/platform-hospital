import React, { Fragment } from 'react';
import { Grid, Paper, makeStyles, styled, Divider } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  imgItem: {
    height: theme.spacing(18),
    display: 'flex',
    alignItems: 'center'
  },
  gridWrap: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    alignItems: 'center',
    paddingRight: theme.spacing(1)
  },
  gridItem: {
    padding: theme.spacing(2),
    paddingRight: 0,
    paddingBottom: 0,
    color: theme.palette.text.secondary
  }
}));

const Img = styled(({ bg, ...other }) => <img alt="a" {...other} src={bg} />)({
  maxWidth: '100%',
  height: 'auto'
  // background: bg => {
  //   return bg.bg === 'red'
  //     ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  //     : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)';
  // }
});

export default withRouter(function ListItem({ list = [], ...props }) {
  const classes = useStyles();

  return (
    <>
      {list.map((item, idx) => (
        <Fragment key={idx}>
          <Grid
            container
            spacing={3}
            className={classes.gridWrap}
            onClick={() => {
              props.history && props.history.push('/detail/' + idx);
            }}
          >
            <Grid item xs={8}>
              <Paper elevation={0} className={classes.gridItem}>
                {item.text}
                <h5>{item.time}</h5>
              </Paper>
            </Grid>

            <Grid
              item
              xs={4}
              className={classes.imgItem}
              style={{ paddingLeft: 0 }}
            >
              <Img bg={require('assets/imgs/test.jpg')}></Img>
            </Grid>
          </Grid>
          <Divider />
        </Fragment>
      ))}
    </>
  );
});
