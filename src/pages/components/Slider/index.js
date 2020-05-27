import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Slide, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  info: {
    width: '100vw',
    height: '100vh',
    overflowY: "auto"
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();

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
          <Paper
            elevation={4}
            className={classes.info}
            style={{ background: props.bgColor }}
          >
            {props.children}
          </Paper>
        </Slide>
      </Modal>
    </div>
  );
}
TransitionsModal.defaultProps = {
  open: false,
  onClose: () => {}
};
