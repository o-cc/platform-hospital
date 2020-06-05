import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Slide, Paper, Grid, Divider } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { vw, requestApi, getQueryKey } from '@/utils';
import ListItem from './AvatarWrap';
import InputComment from '@/pages/Detail/InputComment';
import AppCont from 'container';
import { useParams } from 'react-router-dom';
import useRunning from '@/hooks/useRunning';
import { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Dialog from 'pages/components/Dialog';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none'
  },
  paper1: {
    zIndex: 1,
    position: 'relative',
    margin: theme.spacing(1)
  },
  svg: {
    width: 100,
    height: 100
  },
  info: {
    width: '100vw',
    height: '100vh',
    outline: 'none'
  },
  title: {
    padding: `${vw(15)} 0`,
    borderBottom: '1px solid #bbb',
    marginBottom: vw(15)
  },
  allComment: {
    fontSize: vw(20),
    textAlign: 'left',
    padding: `${vw(30)} ${vw(15)}`
  }
}));

export default function TransitionsModal({ list, ...props }) {
  const classes = useStyles();
  const [inputState, setInputState] = useState('In');
  const [inputCommentKey, setInputCommentKey] = useState(0);
  const { setError } = AppCont.useContainer();
  const { id: news_id } = useParams();
  const [detailComments, setDetailComments] = useState({ results: [] });
  const [currComment, setCurrComment] = useState(list);
  const [dialog, setDialog] = useState({ show: false, info: {} });

  function updateInputCompKey() {
    setInputCommentKey(sta => {
      if (sta > 100) return 0;
      return sta + 1;
    });
  }

  const clickComment = list => {
    setInputState('In');
    updateInputCompKey();
    setCurrComment(list);
  };

  const releaseComment = useRunning(async val => {
    if (!val) return setError('评论内容不能为空噢.', 'warning');
    let data = {
      news_id,
      content: val,
      replay_user_id: currComment.user_id,
      parent_comment_id: list.id
    };
    let { result, error } = await requestApi('postComment', data);
    if (error) return setError(error);
    //返回一条新的评论
    // await getSubComments();
    setDetailComments(comments => {
      comments.results.unshift(result);
      return {
        ...comments
      };
    });
  });

  const getSubComments = useCallback(
    async page => {
      let { result, error } = await requestApi('getSubComments', {
        news_id,
        comment_id: list.id,
        page
      });
      if (error) {
        return setError(error);
      }
      if (page > 1) {
        setDetailComments(comments => ({
          ...comments,
          ...result,
          results: comments.results.concat(result.results)
        }));
      } else {
        setDetailComments(result);
      }
    },
    [list.id, setError, news_id]
  );

  useEffect(() => {
    getSubComments();
  }, [getSubComments]);

  const subCommentsFavorite = async list => {
    const comment_id = list.id;
    let { result, error } = await requestApi('putLikeComment', {
      news_id: news_id,
      comment_id
    });
    if (error) {
      return setError(error);
    }
    setDetailComments(comments => ({
      ...comments,
      results: comments.results.map(item => {
        if (item.id === list.id) {
          return {
            ...item,
            ...result
          };
        }
        return item;
      })
    }));
  };

  const loadFunc = async () => {
    let next = detailComments.next;
    let page = getQueryKey('page', next);
    await getSubComments(page);
  };

  const deleteComment = async () => {
    const comment = dialog.comment;
    let { error } = await requestApi('deleteComment', {
      news_id,
      comment_id: comment.id
    });
    setDialog(sta => ({ ...sta, show: false }));
    if (error) return setError(error);
    setDetailComments(comments => ({
      ...comments,
      results: comments.results.filter(item => item.id !== comment.id)
    }));
  };
  const hasMore = detailComments.next;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={true}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Slide
          direction="up"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={300}
        >
          <Paper elevation={4} className={classes.info}>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadFunc}
              hasMore={!!hasMore}
              style={{ height: '92%', overflowY: 'auto' }}
              loader={
                <div style={{ textAlign: 'center' }} key={0}>
                  正在加载...
                </div>
              }
            >
              <Grid container justify="center" alignItems="center">
                {/* 顶部导航 */}

                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  className={classes.title}
                >
                  <Grid
                    item
                    xs={5}
                    style={{ paddingLeft: '10px' }}
                    onClick={props.onClose}
                  >
                    <CloseOutlinedIcon />
                  </Grid>
                  <span>{list.sub_comment_count}条回复</span>
                </Grid>
                {/* 父评论 */}
                <ListItem
                  list={list}
                  favorite={props.favorite}
                  deleteComment={props.deleteComment}
                  onClick={clickComment}
                />
              </Grid>
              <Divider />
              <Grid container justify="center" alignItems="center">
                <Grid item xs={12} className={classes.allComment}>
                  全部评论
                </Grid>

                {detailComments.results.map(list => (
                  <ListItem
                    key={list.id}
                    list={list}
                    favorite={subCommentsFavorite}
                    deleteComment={async comment => {
                      setDialog({ show: true, comment });
                    }}
                    onClick={clickComment}
                  />
                ))}
              </Grid>
            </InfiniteScroll>

            {/* 这个setKey的操作太骚了 */}
            <InputComment
              holder={`回复${currComment.username}的评论`}
              comType={inputState}
              key={inputCommentKey}
              isDetail={true}
              onRelease={releaseComment}
              onClickOutside={() => {
                //恢复到对夫评论的回复
                setCurrComment(list);
              }}
            />
            <Dialog
              text="删除评论后无法恢复噢"
              handleOk={deleteComment}
              open={dialog.show}
              onClose={() => setDialog(stat => ({ ...stat, show: false }))}
            ></Dialog>
          </Paper>
        </Slide>
      </Modal>
    </div>
  );
}
TransitionsModal.defaultProps = {
  replay: {}
};
