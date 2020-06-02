import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Slide, Paper, Grid, Divider } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { vw, requestApi } from '@/utils';
import ListItem from './AvatarWrap';
import InputComment from 'pages/components/InputComment';
import AppCont from 'container';
import { useParams } from 'react-router-dom';

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
  const [holder, setHolder] = useState();
  const [detailComments, setDetailComments] = useState({ results: [] });

  function updateInputCompKey() {
    setInputCommentKey(sta => {
      if (sta > 100) return 0;
      return sta + 1;
    });
  }

  useEffect(() => {
    setHolder('回复' + list.username + '的评论');
  }, [list.username]);

  useEffect(() => {
    async function getDetailComment() {
      let { result, error } = await requestApi('getSubComments', {
        news_id,
        comment_id: list.id
      });
      if (error) {
        return setError(error);
      }
      setDetailComments(result);
      console.log('detail comment', result);
    }
    getDetailComment();
  }, [list.id, setError, news_id]);

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
            <Grid container justify="center" alignItems="center">
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
              <ListItem
                list={list}
                onClick={list => {
                  console.log('author list: ', list);
                  setHolder('回复' + list.username + '的评论');
                  setInputState('In');
                  updateInputCompKey();
                }}
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
                  favorite={() => {
                    console.log('二级子评论点击喜欢');
                  }}
                  onClick={list => {
                    console.log('consumer list: ', list);
                    setHolder('回复' + list.username + '的评论');
                    setInputState('In');
                    updateInputCompKey();
                  }}
                />
              ))}
            </Grid>
            {/* 这个setKey的操作太骚了 */}
            <InputComment
              holder={holder}
              comType={inputState}
              key={inputCommentKey}
              isDetail={true}
              onClickOutside={() => {
                //恢复到对夫评论的回复
                setHolder('回复' + list.username + '的评论');
              }}
            />
          </Paper>
        </Slide>
      </Modal>
    </div>
  );
}
TransitionsModal.defaultProps = {
  replay: {}
};
