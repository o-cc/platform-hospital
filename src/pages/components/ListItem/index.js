import React, { Fragment } from 'react';
import { Grid, Paper, makeStyles, styled, Divider } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  imgItem: {
    height: theme.spacing(18),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
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
  width: '100%',
  maxWidth: '200px',
  height: 'auto',
  maxHeight: '100px'
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
              if (props.onClick) return props.onClick(item.news_id);

              if (item.news_type === 'Video') {
                props.history &&
                  props.history.push('/video/detail/' + item.news_id);
              } else {
                props.history && props.history.push('/detail/' + item.news_id);
              }
            }}
          >
            <Grid item xs={8}>
              <Paper elevation={0} className={classes.gridItem}>
                {item.title}
                <h5>
                  {item.create_time} {item.username}
                </h5>
              </Paper>
            </Grid>

            <Grid
              item
              xs={4}
              className={classes.imgItem}
              style={{ paddingLeft: 0 }}
            >
              <Img bg={item.index_image_url}></Img>
            </Grid>
          </Grid>
          <Divider />
        </Fragment>
      ))}
    </>
  );
});
