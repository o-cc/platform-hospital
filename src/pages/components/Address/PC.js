import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Divider, Grid, Typography } from '@material-ui/core';
import EditorAddress from 'pages/components/Address/Child/editor';
import AddressItem from '@/pages/components/Address/Child/item';
import useRunning from '@/hooks/useRunning';
import { requestApi } from '@/utils';
import container from '@/container';
import Modal from 'pages/components/Modal';

const useStyles = makeStyles(theme => ({
  title: {
    color: '#b0b0b0',
    fontSize: 16,
    marginBottom: 10
  },
  central: {
    padding: '30px 20px 20px',
    background: '#fff',
    minHeight: 500,
    maxHeight: '80vh',
    overflowY: 'auto',
    width: 660,
    margin: 'auto',
    '& .address-add': {
      margin: theme.spacing(0, 2, 2),
      '& .add-items': {
        width: '80%'
      }
    },
    '& .address-select': {
      margin: theme.spacing(0, 2),

      '& .address-list': {}
    }
  },
  editor: {
    width: 500,
    height: 400,
    background: '#fff',
    padding: 8
  }
}));
export default props => {
  const classes = useStyles();
  const [openAdd, setOpenAdd] = useState(false);
  const [addressInfo, setAddressInfo] = useState({ addresses: [] });
  const { setError } = container.useContainer();
  const [editor, setEditor] = useState(false);
  const getAddress = useCallback(async () => {
    let { result, error } = await requestApi('getAddress');
    if (error) {
      return setError(error);
    }
    // let defaultId = result.default_address_id;
    // if (defaultId) {
    //   setCurrAddress(getObjInArrayByKey(result.addresses, 'id', defaultId));
    // }
    setAddressInfo(result);
  }, [setError]);
  useEffect(() => {
    getAddress();
  }, [getAddress]);

  const addAddress = useRunning(async values => {
    let { result, error } = await requestApi('postAddress', values);
    if (error) return setError(error);
    setAddressInfo(lists => ({
      ...lists,
      addresses: lists.addresses.concat(result)
    }));
    setTimeout(() => {
      setOpenAdd(false);
    }, 10);
  });

  const modifiedAddress = useRunning(async values => {
    let { error } = await requestApi('putAddress', {
      address_id: editor.id,
      ...values
    });
    if (error) return setError(error);
    setEditor(null);
    getAddress();
  });

  const deleteAddress = useRunning(async list => {
    let { error } = await requestApi('deleteAddress', { address_id: list.id });
    if (error) return setError(error);
    setError('操作成功.', 'success');
    setAddressInfo(lists => ({
      ...lists,
      addresses: lists.addresses.filter(item => item.id !== list.id)
    }));
  });

  return (
    <div className={classes.central}>
      <div className="address-add">
        <div className={classes.title}>
          添加收获地址
          <Switch
            checked={openAdd}
            onChange={e => setOpenAdd(e.target.checked)}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>
        <div className="add-items">
          {openAdd && (
            <EditorAddress
              isDefault={false}
              initValue={{}}
              onSubmit={addAddress}
            />
          )}
        </div>
        <Divider />
      </div>
      <div className="address-select">
        <div className="title">我的收货地址</div>
        <div className="address-list">
          <Grid container spacing={1}>
            {addressInfo.addresses.map(item => (
              <Grid item xs={6} key={item.id} className="address">
                <AddressItem
                  addressItem={item}
                  onEditor={() => setEditor(item)}
                  onDelete={deleteAddress}
                  click={list => {
                    props.onClick && props.onClick(list);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <Modal open={!!editor} onClose={() => setEditor(null)}>
        <div className={classes.editor}>
          <Typography variant="subtitle1" color="textSecondary">
            修改地址
          </Typography>
          <EditorAddress
            isDefault={false}
            initValue={editor || {}}
            onSubmit={modifiedAddress}
          />
        </div>
      </Modal>
    </div>
  );
};
