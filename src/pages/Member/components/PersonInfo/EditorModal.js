import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Select } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
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
    name: type,
    InputLabelProps: {
      shrink: true
    },
    className: classes.textField
  });

  const content = type => {
    let com = null;
    switch (type) {
      case 'addr':
        com = (
          <Field
            margin="normal"
            required
            label="请输入详细地址"
            defaultValue={props.userInfo.addr}
            component={TextField}
            {...inputProps('addr')}
            name="addr"
          />
        );
        break;
      case 'username':
        com = (
          <Field
            margin="normal"
            required
            label="更换昵称"
            defaultValue={props.userInfo.username}
            component={TextField}
            {...inputProps('username')}
            name="username"
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

      case 'intro':
        com = (
          <Field
            margin="normal"
            required
            component={TextField}
            defaultValue={props.userInfo.intro}
            type="text"
            label="个人简介"
            placeholder="一句话介绍自己"
            {...inputProps('intro')}
            name="intro"
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
      <Formik
        initialValues={{
          username: '',
          addr: '',
          intro: '',
          sex: ''
        }}
        validate={values => {
          const errors = {};
          return errors;
        }}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ submitForm }) => (
          <Form>
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
                <Button onClick={submitForm} color="primary">
                  确定
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>
    </div>
  );
}

FormDialog.defaultProps = {
  info: {
    show: false
  }
};
