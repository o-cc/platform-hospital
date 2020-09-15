import React, { Fragment } from 'react';
import {
  Grid,
  makeStyles,
  styled,
  Divider,
  Typography
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import useWidth from '@/hooks/useWidth';
const useStyles = makeStyles(theme => ({
  imgItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    height: '100%'
  },
  gridWrap: {
    alignItems: 'center',
    padding: theme.spacing(1, 2, 1.5, 2),
    background: '#fff'
  },
  gridItem: {
    fontSize: 15,
    color: theme.palette.text.secondary,
    display: 'flex',
    minHeight: theme.spacing(13),
    flexDirection: 'column',
    justifyContent: 'space-around',
    '&>h5': {
      margin: theme.spacing(1)
    }
  },
  textFlow: {
    padding: theme.spacing(1, 0),
    color: '#000',
    fontSize: 18,
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  poster: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  videoLong: {
    position: 'absolute',
    right: 0,
    bottom: theme.spacing(0.5),
    padding: theme.spacing(0.1, 1),
    background: 'rgba(23,23,23, 0.5)',
    color: '#fff',
    fontSize: 10,
    borderRadius: 8
  },
  detail: {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    minHeight: '60px',
    marginBottom: theme.spacing(1)
  }
}));

const Img = styled(({ bg, ...other }) => <img alt="a" {...other} src={bg} />)({
  width: '100%',
  maxWidth: '125px',
  borderRadius: 5,
  height: 'auto',
  maxHeight: '100px'
});

export default withRouter(function ListItem({ list = [], ...props }) {
  const classes = useStyles();
  const screen = useWidth();
  if (list.length <= 0) {
    return (
      <Typography
        variant="body2"
        style={{ background: '#fff' }}
        color="textSecondary"
        align="center"
      >
        没有更多了~
      </Typography>
    );
  }
  return (
    <>
      {list.map((item, idx) => (
        <Fragment key={idx}>
          <Grid
            container
            className={classes.gridWrap}
            justify="space-between"
            onClick={() => {
              if (props.onClick) return props.onClick(item.news_id);

              let hash = '/';
              if (item.news_type === 'Video') {
                hash = '/video/detail/' + item.news_id;
              } else {
                hash = '/detail/' + item.news_id;
              }
              if (screen !== 'xs') {
                const url = `${window.location.origin}${window.location.pathname}#${hash}`;
                return window.open(url, '_blank');
              }
              props.history && props.history.push(hash);
            }}
          >
            <Grid item xs={12}>
              {/* <Paper elevation={0} className={classes.gridItem}> */}
              <div className={classes.textFlow}>{item.title}</div>
              {/* </Paper> */}
            </Grid>

            <Grid container>
              <Grid item xs={item.index_image_url ? 8 : 12}>
                <Grid
                  container
                  direction="column"
                  style={{ height: '100%' }}
                  justify="flex-end"
                >
                  <div className={classes.detail}>
                    <Typography variant="body1" color="textSecondary">
                      {item.detail}
                    </Typography>
                  </div>
                  <Typography variant="body1" color="textSecondary">
                    {item.create_time} {item.username}
                  </Typography>
                </Grid>
              </Grid>

              {item.index_image_url && (
                <Grid
                  item
                  xs={4}
                  className={classes.imgItem}
                  style={{ paddingLeft: 0 }}
                >
                  <div style={{ position: 'relative' }}>
                    <Img bg={item.index_image_url}></Img>
                    {item.news_type === 'Video' && (
                      <div className={classes.poster}>
                        <PlayCircleFilledWhiteRoundedIcon
                          style={{ fontSize: '3rem', color: '#fff' }}
                        />
                        <Typography
                          color="textSecondary"
                          component="span"
                          className={classes.videoLong}
                        >
                          {item.video_long}
                        </Typography>
                      </div>
                    )}
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>
          {list.length > idx + 1 && <Divider variant="middle" />}
        </Fragment>
      ))}
    </>
  );
});
