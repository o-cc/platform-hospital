import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CommentDetail from './Child/CommentDetail';
import { vw } from '@/utils';
import ListItem from './Child/AvatarWrap';

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: theme.spacing(2),
      marginBottom: vw(120),
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

export default props => {
  const classes = useStyles();
  const [reply, setShowReply] = useState({ show: false });
  //点赞
  const favorite = (list, idx, e) => {
    e.stopPropagation();
    // setCommentList(lists => {
    //   lists = lists.map(item => {
    //     let like = item.is_like;
    //     let like_num = 0;

    //     if (item.id === list.id) {
    //       like = !like;
    //       like_num = like ? 1 : -1;
    //     }
    //     return {
    //       ...item,
    //       is_like: like,
    //       like_num: item.like_num + like_num
    //     };
    //   });
    // return [...lists];
    // });
  };

  const replyEvent = currList => {
    setShowReply({ show: true, currList });
  };

  const { results: commentList = [] } = props.comments || {};
  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        {commentList.map((list, idx) => (
          <ListItem
            key={list.id}
            list={list}
            idx={idx}
            favorite={favorite}
            reply={replyEvent}
          />
        ))}

        <Grid item>没有更多了</Grid>
      </Grid>
      {/* 评论详情 */}
      {reply.show && (
        <CommentDetail
          list={reply.currList}
          onClose={() => setShowReply(false)}
        />
      )}
    </>
  );
};
