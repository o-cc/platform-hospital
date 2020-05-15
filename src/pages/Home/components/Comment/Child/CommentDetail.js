import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Slide, Paper, Grid, Divider } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { vw } from '@/utils';
import ListItem from './AvatarWrap';
import { comment_list_detail } from 'configs/test_data.js';
import InputComment from 'pages/Home/components/InputComment';

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
    padding: theme.spacing(2, 4, 3)
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
    height: '100vh'
  },
  title: {
    padding: `${vw(15)} 0`,
    borderBottom: '1px solid #bbb',
    marginBottom: vw(15)
  },
  allComment: {
    fontSize: vw(20),
    alignSelf: 'flex-start',
    padding: `${vw(30)} ${vw(15)}`
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [inputState, setInputState] = useState('In');
  const [inputCommentKey, setInputCommentKey] = useState(0);
  const [holder, setHolder] = useState();
  function updateInputCompKey() {
    setInputCommentKey(sta => {
      if (sta > 100) return 0;
      return sta + 1;
    });
  }

  useEffect(() => {
    setHolder('回复' + comment_list_detail[0].user_name + '的评论');
  }, []);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Slide
          direction="up"
          in={props.open}
          mountOnEnter
          unmountOnExit
          timeout={300}
        >
          <Paper elevation={4} className={classes.info}>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
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
                <span>2条回复</span>
              </Grid>
              <ListItem
                list={comment_list_detail[0]}
                onClick={list => {
                  console.log('author list: ', list);
                  setHolder('回复' + list.user_name + '的评论');
                  setInputState('In');
                  updateInputCompKey();
                }}
              />
            </Grid>
            <Divider />
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <div className={classes.allComment}>全部评论</div>
              {comment_list_detail.map(list => (
                <ListItem
                  key={list.id}
                  list={list}
                  onClick={list => {
                    console.log('consumer list: ', list);
                    setHolder('回复' + list.user_name + '的评论');
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
            />
          </Paper>
        </Slide>
      </Modal>
    </div>
  );
}
TransitionsModal.defaultProps = {
  open: false
};
