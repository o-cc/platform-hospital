import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AreaPicker from 'tools/AreaPicker/AreaPicker';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function DialogSelect(props) {
  const classes = useStyles();
  const [pick, setPick] = React.useState([]);
  const [province, city, region] = pick;

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <AreaPicker
            level={3}
            value={pick}
            // onChange={({ value }) => {
            //   setPick(value);
            // }}
            render={({ provinceData, cityData, regionData }) => (
              <form className={classes.container}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-dialog-select-label">省</InputLabel>
                  <Select
                    labelId="demo-dialog-select-label"
                    id="demo-dialog-select"
                    value={province || ''}
                    onChange={e => setPick([e.target.value])}
                    input={<Input />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {provinceData.map(item => (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="city">市</InputLabel>
                  <Select
                    labelId="city"
                    id="city"
                    value={city || ''}
                    onChange={e => setPick([province, e.target.value])}
                    input={<Input />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {cityData.map(item => (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel id="region">区</InputLabel>
                  <Select
                    labelId="region"
                    id="region"
                    value={region || ''}
                    onChange={e => setPick([province, city, e.target.value])}
                    input={<Input />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {regionData.map(item => (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            取消
          </Button>
          <Button
            onClick={() => {
              props.onHandleOk && props.onHandleOk(pick);
            }}
            color="primary"
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
