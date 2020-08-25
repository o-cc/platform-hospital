import React from 'react';
import { Grid, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useWidth from '@/hooks/useWidth';
const useStyles = makeStyles(theme => ({
  addressItem: {
    marginTop: theme.spacing(1),
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    cursor: 'pointer',
    '& :hover': {
      backgroundColor: '#f5f5f5'
    },
    '& .wrap': {
      padding: theme.spacing(2)
    },
    '&>.MuiGrid-container>div': {
      marginBottom: theme.spacing(1)
    }
  },
  addressItem2: {
    marginTop: theme.spacing(1),
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',

    '& .wrap': {
      padding: theme.spacing(2)
    },
    '&>.MuiGrid-container>div': {
      marginBottom: theme.spacing(1)
    }
  },
  actionButton: {
    margin: theme.spacing(1)
  },
  icon: {
    color: '#999',
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(1)
  },
  arrow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: theme.spacing(1),
    margin: 'auto',
    color: '#aaa'
  },
  colorRed: {
    color: 'red'
  }
}));

export default function AddressItem({
  addressItem: list,
  hasLocation,
  default_id,
  isModify,
  ...props
}) {
  const classes = useStyles();
  const screen = useWidth();

  return (
    <Paper
      className={isModify ? classes.addressItem2 : classes.addressItem}
      onClick={() => {
        props.click && props.click(list);
      }}
    >
      {hasLocation && (
        <>
          {screen === 'xs' && (
            <ArrowForwardIosIcon size="small" className={classes.arrow} />
          )}
          <LocationOnIcon className={classes.icon} />
        </>
      )}
      <Grid container className="wrap">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="subtitle2">{list.receiver}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" align="right">
                {list.mobile}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" style={{ paddingRight: '12px' }}>
            {default_id === list.id && !hasLocation && (
              <span className={classes.colorRed}>[默认地址] </span>
            )}{' '}
            {list.area} {list.address}{' '}
            {screen !== 'xs' && isModify && (
              <Button
                variant="text"
                color="secondary"
                size="small"
                startIcon={<EditIcon />}
                onClick={e => {
                  e.stopPropagation();
                  props.select && props.select(list);
                }}
              >
                修改
              </Button>
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: 0 }}>
          <Grid container justify="flex-end">
            {props.onEditor && (
              <Grid item>
                <Button
                  variant="text"
                  color="inherit"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={e => {
                    e.stopPropagation();
                    props.onEditor();
                  }}
                >
                  编辑
                </Button>
              </Grid>
            )}

            {props.onDelete && (
              <Grid item>
                <Button
                  variant="text"
                  color="secondary"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={e => {
                    e.stopPropagation();
                    props.onDelete(list);
                  }}
                >
                  删除
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

AddressItem.defaultProps = {
  addressItem: {}
};
