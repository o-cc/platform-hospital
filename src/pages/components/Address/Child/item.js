import React from 'react';
import { Grid, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
const useStyles = makeStyles(theme => ({
  addressItem: {
    marginTop: theme.spacing(1),
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
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
  ...props
}) {
  const classes = useStyles();
  return (
    <Paper
      className={classes.addressItem}
      onClick={() => {
        props.click && props.click(list);
      }}
    >
      {hasLocation && (
        <>
          <ArrowForwardIosIcon size="small" className={classes.arrow} />
          <LocationOnIcon className={classes.icon} />
        </>
      )}
      <Grid container style={{ padding: 16 }}>
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
            {list.area} {list.address}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: 0 }}>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                variant="text"
                color="inherit"
                size="small"
                startIcon={<EditIcon />}
                onClick={e => {
                  e.stopPropagation();
                  props.onEditor && props.onEditor();
                }}
              >
                编辑
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="text"
                color="secondary"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={e => {
                  e.stopPropagation();
                  props.onDelete && props.onDelete(list);
                }}
              >
                删除
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

AddressItem.defaultProps = {
  addressItem: {}
};
