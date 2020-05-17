import React, { Fragment } from 'react';
import { Grid, Paper, makeStyles, styled, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  imgItem: {
    height: theme.spacing(18)
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

const Img = styled(({ bg, ...other }) => <Paper {...other} />)({
  height: '100%',
  padding: 0,
  background: bg => {
    return bg.bg === 'red'
      ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)';
  }
});

export default function ListItem({ list }) {
  const classes = useStyles();

  return (
    <>
      {list.map((item, idx) => (
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
    </>
  );
}
ListItem.defaultProps = {
  list: []
};
