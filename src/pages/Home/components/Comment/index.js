import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { vw } from '@/utils';
import { format } from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    fontSize: vw(25),
    lineHeight: vw(35)
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
    margin: `${vw(15)} auto ${vw(10)}`,
    whiteSpace: 'pre-wrap'
  },
  prompt: {
    fontSize: vw(20),
    margin: `0 auto ${vw(30)}`
  },
  colorRed: {
    color: 'red'
  },
  likeWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  // commentWrap: {
  //   marginBottom: theme.spacing(2)
  // }
}));

const comment_list = [
  {
    id: 0,
    avatar: '',
    user_name: '清蒸罗非鱼',
    is_like: false,
    like_num: 0,
    comment_info:
      '作为今年最重要的Windows10更新，v2004还是很受用户关注的，当然它也是值得升级的',
    date: format(new Date(), 'MM-dd HH:mm')
  },
  {
    id: 1,
    avatar: '',
    user_name: '清蒸罗非鱼',
    is_like: false,
    like_num: 0,
    comment_info:
      '作为今年最重要的Windows10更新，v2004还是很受用户关注的，当然它也是值得升级的',
    date: format(new Date(), 'MM-dd HH:mm')
  }
];

export default () => {
  const classes = useStyles();
  const [commentList, setCommentList] = useState(comment_list);
  const favorite = (list, idx) => {
    setCommentList(lists => {
      lists = lists.map(item => {
        let like = item.is_like;
        let like_num = 0;

        if (item.id === list.id) {
          like = !like;
          like_num = like ? 1 : -1;
        }
        return {
          ...item,
          is_like: like,
          like_num: item.like_num + like_num
        };
      });
      return [...lists];
    });
  };
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      {commentList.map((list, idx) => (
        <Grid item xs={11} key={list.id} className={classes.commentWrap}>
          <Grid container justify="space-between" alignItems="center">
            <div className={classes.avatar}>
              <Avatar
                alt="avatar"
                src={list.avatar || require('assets/imgs/test_avatar.jpg')}
              />
              <span>{list.user_name}</span>
            </div>
            <div className={classes.likeWrap}>
              <FavoriteBorderOutlinedIcon
                fontSize="small"
                className={list.is_like ? classes.colorRed : ''}
                onClick={() => favorite(list, idx)}
              />
              <span>{list.like_num}</span>
            </div>
          </Grid>
          <Grid item className={classes.comment} xs={11}>
            {list.comment_info}
          </Grid>

          <Grid item xs={11} className={classes.prompt}>
            {list.date}
          </Grid>
        </Grid>
      ))}

      <Grid item>没有更多了</Grid>
    </Grid>
  );
};
