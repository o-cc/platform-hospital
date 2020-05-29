import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { InputLabel, Select } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  input: {
    display: 'none'
  }
}));

export default function FormDialog(props) {
  const classes = useStyles();

  const inputProps = type => ({
    id: type,
    InputLabelProps: {
      shrink: true
    },
    className: classes.textField
  });

  const content = type => {
    let com = null;
    switch (type) {
      case 'name':
        com = (
          <TextField
            label="更换昵称"
            defaultValue="胖虎张无忌"
            {...inputProps('name')}
          />
        );
        break;
      case 'sex':
        com = (
          <>
            <InputLabel htmlFor="age-native-simple">请选择性别</InputLabel>
            <Select
              native
              inputProps={{
                name: 'male',
                id: 'age-native-simple'
              }}
              defaultValue="male"
            >
              <option value="secret">私密</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </Select>
          </>
        );
        break;
      case 'birthday':
        com = (
          <TextField
            type="date"
            label="请选择日期"
            defaultValue={format(new Date(), 'yyyy-MM-dd')}
            {...inputProps('date')}
          />
        );
        break;
      case 'introduce':
        com = (
          <TextField
            type="text"
            label="个人简介"
            placeholder="一句话介绍自己"
            {...inputProps('introduce')}
          />
        );
        break;
      default:
        break;
    }
    return com;
  };

  return (
    <div>
      <Dialog
        open={props.info.show}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        {/* <DialogTitle id="form-dialog-title">请选择生日</DialogTitle> */}
        <DialogContent>{content(props.info.type)}</DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            取消
          </Button>
          <Button onClick={props.confirm} color="primary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.defaultProps = {
  info: {
    show: false
  }
};
