import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CommentDetail from './Child/CommentDetail';
import { vw } from '@/utils';
import ListItem from './Child/AvatarWrap';
import useRunning from 'hooks/useRunning';
// import AppCont from 'container';
// import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: theme.spacing(2),
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
  // const { setError } = AppCont.useContainer();
  const replyEvent = useRunning(idx => {
    setShowReply({ show: true, currIdx: idx });
  });

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
            favorite={props.favorite}
            reply={replyEvent}
            deleteComment={props.deleteComment}
          />
        ))}

        <Grid item>没有更多了</Grid>
      </Grid>
      {/* 评论详情 */}
      {reply.show && (
        <CommentDetail
          favorite={props.favorite}
          deleteComment={props.deleteComment}
          list={commentList[reply.currIdx]}
          onClose={() => setShowReply(false)}
        />
      )}
    </>
  );
};
