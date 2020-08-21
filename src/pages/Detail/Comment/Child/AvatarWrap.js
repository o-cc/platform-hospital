import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { vw } from '@/utils';
import { withRouter } from 'react-router-dom';
import { defaultAvatar } from 'configs';

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
      margin: '8px auto 8px',
      whiteSpace: 'pre-wrap'
    },
    prompt: {
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'center',
      fontSize: 14,
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
    },
    delete: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: `${vw(2)} ${vw(15)}`,
      color: 'red',
      marginLeft: vw(7.5)
    },
    colorBlue: {
      color: '#3f51b5',
      cursor: 'pointer'
    }
  };
});

function List({ list, idx = 0, ...props }) {
  const classes = useStyles();
  const clickUser = e => {
    e.stopPropagation();
    props.history && props.history.push('/user/' + list.user_id);
  };
  return (
    <Grid
      item
      xs={11}
      key={list.id}
      className={classes.commentWrap}
      onClick={e => {
        //判断是否是有二级评论
        props.reply && props.reply(idx);
        props.onClick && props.onClick(list);
      }}
    >
      <Grid container justify="space-between" alignItems="center">
        <div className={classes.avatar} onClick={clickUser}>
          <Avatar alt="avatar" src={list.avatar || defaultAvatar} />
          <span>{list.username}</span>
        </div>
        <div className={classes.flex}>
          <FavoriteBorderOutlinedIcon
            fontSize="small"
            className={list.is_like ? classes.colorRed : ''}
            onClick={e => {
              e.stopPropagation();
              props.favorite && props.favorite(list, idx);
            }}
          />
          <span>{list.like_count}</span>
        </div>
      </Grid>
      <Grid item className={classes.comment} xs={11}>
        {list.content}{' '}
        {list.replay_username && (
          <span
            className={classes.colorBlue}
            onClick={clickUser}
          >{` @${list.replay_username}`}</span>
        )}
      </Grid>

      <Grid item xs={11} className={classes.prompt}>
        {list.create_time && list.create_time}
        {props.reply && list.sub_comment_count ? (
          <div className={classes.reply}>{list.sub_comment_count}回复</div>
        ) : null}
        {list.has_delete && (
          <div
            className={classes.delete}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              props.deleteComment && props.deleteComment(list);
            }}
          >
            删除
          </div>
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
export default withRouter(List);
