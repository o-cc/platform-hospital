import React from 'react';
import { Grid, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
const useStyles = makeStyles(theme => ({
  addressItem: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
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
    marginRight: theme.spacing(1)
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

  ...props
}) {
  const classes = useStyles();
  return (
    <Paper
      className={classes.addressItem}
      onClick={() => {
        props.click && props.click();
      }}
    >
      {hasLocation && (
        <>
          <ArrowForwardIosIcon size="small" className={classes.arrow} />
          <LocationOnIcon className={classes.icon} />
        </>
      )}
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="subtitle2">{list.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" align="right">
                {list.phone}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" style={{ paddingRight: '12px' }}>
            {list.is_default && !hasLocation && (
              <span className={classes.colorRed}>[默认地址] </span>
            )}{' '}
            {list.detail}
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
