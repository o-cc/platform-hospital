import React, { useState } from 'react';
import { Grid, Avatar, Button, Divider } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { vw } from '@/utils';
import { withRouter } from 'react-router-dom';
import { defaultAvatar } from 'configs';
import useWidth from '@/hooks/useWidth';

const useStyles = makeStyles(theme => {
  return {
    commentWrap: {
      marginBottom: 10
    },
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
      margin: `0 auto 16px`
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
      padding: theme.spacing(0.2, 2),
      color: 'red',
      marginLeft: vw(7.5)
    },
    colorBlue: {
      color: '#3f51b5',
      cursor: 'pointer'
    },
    textarea: {
      padding: theme.spacing(1.2, 2),
      width: '90%',
      height: '90px',
      fontSize: '13px',
      border: '1px solid #eee',
      borderRadius: 4,
      backgroundColor: '#fafafa',
      resize: 'none',
      display: 'inline-block',
      verticalAlign: 'top',
      outlineStyle: 'none',
      overflow: 'auto',
      marginLeft: theme.spacing(1)
    },
    btn: {
      margin: theme.spacing(1),
      float: 'right'
    },
    clearFloat: {
      overflow: 'hidden'
    }
  };
});

function List({ list, idx = 0, ...props }) {
  const classes = useStyles();
  const [showComment, setShowComment] = useState();
  const clickUser = e => {
    e.stopPropagation();
    props.history && props.history.push('/user/' + list.user_id);
  };
  const screen = useWidth();
  const [inputVal, setInputVal] = useState('');
  return (
    <Grid
      item
      xs={11}
      key={list.id}
      className={classes.commentWrap}
      onClick={e => {
        //如果是pc， 不触发
        // if (screen !== 'xs') return;
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
        {screen ? (
          <>
            {props.reply && list.sub_comment_count ? (
              <div className={classes.reply}>{list.sub_comment_count}回复</div>
            ) : null}
          </>
        ) : (
          <Button
            size="small"
            variant="text"
            color="primary"
            onClick={() => setShowComment(list.id)}
          >
            评论
          </Button>
        )}
        {list.has_delete && (
          <Button
            size="small"
            variant="text"
            color="secondary"
            style={{ marginLeft: -8 }}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              props.deleteComment && props.deleteComment(list);
            }}
          >
            删除
          </Button>
        )}
      </Grid>
      {list.id === showComment ? (
        <Grid item xs={11} className={classes.clearFloat}>
          <textarea
            className={classes.textarea}
            placeholder="写下你的评论吧...."
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
          ></textarea>
          <Button
            size="small"
            className={classes.btn}
            variant="outlined"
            onClick={() => {
              setShowComment(null);
              setInputVal('');
            }}
          >
            取消
          </Button>
          <Button
            size="small"
            className={classes.btn}
            color="primary"
            variant="contained"
            onClick={async () => {
              // await onRelease(inputVal);
              setInputVal('');
            }}
          >
            发布
          </Button>
        </Grid>
      ) : null}
      <Divider />
    </Grid>
  );
}

List.defaultProps = {
  list: {},
  idx: 0,
  favorite: () => {}
};
export default withRouter(List);
