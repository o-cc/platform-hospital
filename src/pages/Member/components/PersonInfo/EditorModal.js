import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { infoList } from './helper';

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
    opacity: '0'
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
            component={TextField}
            {...inputProps('addr')}
          />
        );
        break;
      case 'username':
        com = (
          <Field
            margin="normal"
            required
            label={infoList.username}
            component={TextField}
            placeholder={infoList.username}
            {...inputProps('username')}
          />
        );
        break;
      case 'company':
        com = (
          <Field
            margin="normal"
            required
            label={infoList.company}
            placeholder={infoList.company}
            component={TextField}
            {...inputProps('company')}
          />
        );
        break;
      case 'departments':
        com = (
          <Field
            margin="normal"
            required
            placeholder={infoList.departments}
            label={infoList.departments}
            component={TextField}
            {...inputProps('departments')}
          />
        );
        break;
      case 'job':
        com = (
          <Field
            margin="normal"
            required
            label={infoList.job}
            placeholder={infoList.job}
            component={TextField}
            {...inputProps('job')}
          />
        );
        break;
      case 'intro':
        com = (
          <Field
            margin="normal"
            required
            component={TextField}
            type="text"
            label={infoList.intro}
            placeholder="一句话介绍自己"
            {...inputProps('intro')}
          />
        );
        break;
      default:
        break;
    }
    return com;
  };

  const onUpdateInfo = async values => {
    let type = props.info.type;
    let data = {
      [type]: values[type]
    };
    props.updateUserInfo && (await props.updateUserInfo(data));
  };

  const userInfo = props.userInfo;
  return (
    <div>
      <Dialog
        open={props.info.show}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          initialValues={{
            username: userInfo.username || '',
            addr: userInfo.addr || '',
            intro: userInfo.intro || '',
            company: userInfo.company,
            departments: userInfo.departments,
            job: userInfo.job || ''
          }}
          validate={values => {
            const errors = {};
            return errors;
          }}
          onSubmit={onUpdateInfo}
        >
          {({ submitForm }) => (
            <Form>
              <DialogContent>{content(props.info.type)}</DialogContent>
              <DialogActions>
                <Button onClick={props.onClose} color="primary">
                  取消
                </Button>
                <Button onClick={submitForm} color="primary">
                  确定
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

FormDialog.defaultProps = {
  info: {
    show: false
  }
};
