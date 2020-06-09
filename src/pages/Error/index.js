import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import AppCont from 'container';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    },
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999
  }
}));

export default function TransitionAlerts({ ...props }) {
  const classes = useStyles();
  const { setError, error } = AppCont.useContainer();
  useEffect(() => {
    const time = error.type === 'error' ? 10000 : 5000;
    let timer = setTimeout(() => {
      setError('');
    }, error.timeout || time);
    return () => {
      clearTimeout(timer);
    };
  }, [error.timeout, error.type, setError]);
  return (
    <div className={classes.root}>
      <Collapse in={!!error.error}>
        <Alert
          severity={error.type || 'error'}
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError('');
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error.type === 'error' ? (
            <AlertTitle>诶呀堵车了：</AlertTitle>
          ) : null}
          {error.error}
        </Alert>
      </Collapse>
    </div>
  );
}
