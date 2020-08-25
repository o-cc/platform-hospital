import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import AppCont from 'container';
import useWidth from '@/hooks/useWidth';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    '& > * + *': {
      marginTop: theme.spacing(2)
    },
    position: 'fixed',
    top: '0',
    left: 0,
    right: 0,
    margin: 'auto',
    zIndex: 9999
  }
}));

export default function TransitionAlerts({ ...props }) {
  const classes = useStyles();
  const { setError, error } = AppCont.useContainer();
  useEffect(() => {
    const time = error.type === 'error' ? 8000 : 5000;
    let timer = setTimeout(() => {
      setError('');
    }, error.timeout || time);
    return () => {
      clearTimeout(timer);
    };
  }, [error.timeout, error.type, setError]);
  let errMsg = Array.isArray(error.error) ? error.error[0] : error.error;
  const screen = useWidth();

  return (
    <div className={classes.root} style={{ top: screen !== 'xs' ? '5%' : '0' }}>
      <Collapse in={!!errMsg}>
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
          {errMsg}
        </Alert>
      </Collapse>
    </div>
  );
}
