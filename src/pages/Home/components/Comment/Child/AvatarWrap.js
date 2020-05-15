import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { vw } from '@/utils';

const useStyles = makeStyles(theme => {
  return {
    avatar: {
      display: 'flex',
      alignItems: 'center',

      '& span': {
        paddingLeft: theme.spacing(2),
        color: '#07468b'
      }
    },
    comment: {
      margin: `${vw(15)} auto ${vw(10)}`,
      whiteSpace: 'pre-wrap'
    },
    prompt: {
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'center',
      fontSize: vw(20),
      margin: `0 auto ${vw(30)}`
    },
    colorRed: {
      color: 'red'
    },
    flex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    reply: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: `${vw(2)} ${vw(15)}`,
      background: 'rgba(0,0,0, 0.1)',
      borderRadius: vw(20),
      color: '#333',
      marginLeft: vw(7.5)
    },
    paper: {
      width: '100vw',
      height: '100vh'
    }
  };
});

export default function List({ list, idx = 0, ...props }) {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={11}
      key={list.id}
      className={classes.commentWrap}
      onClick={e => {
        //判断是否是有二级评论
        props.reply && props.reply();
        props.onClick && props.onClick(list);
      }}
    >
      <Grid container justify="space-between" alignItems="center">
        <div className={classes.avatar}>
          <Avatar
            alt="avatar"
            src={list.avatar || require('assets/imgs/test_avatar.jpg')}
          />
          <span>{list.user_name}</span>
        </div>
        <div className={classes.flex}>
          <FavoriteBorderOutlinedIcon
            fontSize="small"
            className={list.is_like ? classes.colorRed : ''}
            onClick={e => props.favorite(list, idx, e)}
          />
          <span>{list.like_num}</span>
        </div>
      </Grid>
      <Grid item className={classes.comment} xs={11}>
        {list.comment_info}
      </Grid>

      <Grid item xs={11} className={classes.prompt}>
        {list.date}
        {props.reply && list.reply && (
          <div className={classes.reply}>{list.reply}回复</div>
        )}
      </Grid>
    </Grid>
  );
}

List.defaultProps = {
  list: {},
  idx: 0,
  favorite: () => {}
};
