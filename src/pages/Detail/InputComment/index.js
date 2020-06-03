import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Input, Button, Badge } from '@material-ui/core';
import { vw } from '@/utils';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import ClickOutside from '@/tools/ClickOutside';
import useInput from '@/hooks/useInput';
const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
    margin: 'auto',
    borderTop: '1px solid #ccc',
    padding: theme.spacing(2),
    fontSize: vw(30)
  },
  textarea: {
    display: 'block',
    maxHeight: vw(105),
    overflowY: 'scroll',
    borderRadius: theme.spacing(2),
    background: 'rgba(120, 120, 120, 0.1)',
    color: '#333',
    paddingLeft: theme.spacing(3)
  },
  push: {
    borderRadius: '50%'
  },
  icon: {
    color: '#888',
    marginRight: theme.spacing(1)
  },
  write: {
    display: 'flex',
    borderRadius: theme.spacing(2),
    background: 'rgba(120,120,120, 0.1)',
    padding: `${vw(7)} ${vw(15)}`,
    fontSize: vw(25),
    alignItems: 'center',
    justifyConent: 'center'
  },
  like: {
    color: 'orange'
  },
  color_white: { color: '#fff' }
}));

function In({
  classes,
  changeComp,
  release,
  value,
  onChange,
  holder,
  onClickOutside
}) {
  return (
    <ClickOutside
      onClickOutside={() => {
        changeComp('Default');
        onClickOutside && onClickOutside();
      }}
    >
      <Grid
        container
        alignItems="flex-end"
        justify="space-between"
        className={classes.root}
      >
        <Grid item xs={10}>
          <Input
            autoFocus
            className={classes.textarea}
            disableUnderline
            multiline
            aria-label="maximum height"
            placeholder={holder || '说点什么吧...'}
            fullWidth
            value={value}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="text"
            color="primary"
            className={classes.push}
            onClick={() => release()}
          >
            发布
          </Button>
        </Grid>
      </Grid>
    </ClickOutside>
  );
}

function Default({
  collected,
  classes,
  changeComp,
  isDetail = false,
  count = 0,
  ...props
}) {
  return (
    <Grid container justify="space-between" className={classes.root}>
      <Grid item xs={!isDetail ? 8 : 12}>
        <Grid
          item
          xs={12}
          className={classes.write}
          onClick={() => changeComp('In')}
        >
          <BorderColorIcon
            color="primary"
            fontSize="small"
            className={classes.icon}
          />
          <div>写评论....</div>
        </Grid>
      </Grid>
      {!isDetail && (
        <>
          <Grid item>
            <Badge
              //点击跑到评论这里
              // onClick={() => {}}
              badgeContent={count}
              max={999}
              color="secondary"
              children={<ChatBubbleOutlineIcon fontSize="small" />}
            />
          </Grid>
          <Grid item style={{ marginRight: 20 }}>
            {collected ? (
              <StarRoundedIcon color="secondary" onClick={props.onCollect} />
            ) : (
              <StarBorderRoundedIcon color="action" onClick={props.onCollect} />
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default ({ comType = 'Default', onRelease = () => {}, ...props }) => {
  const classes = useStyles();
  const [com, setCom] = useState('Default');

  useEffect(() => {
    setCom(comType);
  }, [comType]);
  const defaultProps = {
    classes,
    changeComp: type => {
      setCom(type);
    },
    ...props
  };
  let { value, onChange } = useInput();

  return (
    <>
      {com === 'Default' ? (
        <Default {...defaultProps} />
      ) : (
        <In
          {...defaultProps}
          value={value}
          onChange={onChange}
          release={() => {
            setCom('Default');
            onChange({ target: { value: '' } });
            onRelease(value);
          }}
        />
      )}
    </>
  );
};
