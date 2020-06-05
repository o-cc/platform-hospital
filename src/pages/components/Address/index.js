import React, { useState, useEffect } from 'react';
import { Grid, Button, makeStyles, Divider } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import Slider from '@/pages/components/Slider';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { vw, requestApi } from '@/utils';
import AddressItem from './Child/item';
import EditorAddress from './Child/editor';
import AppCont from 'container';
import useRunning from '@/hooks/useRunning';
import Dialog from 'pages/components/Dialog';
const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${vw(15)} ${vw(22.5)}`,
    color: '#778'
  }
}));

export default function Address(props) {
  const classes = useStyles();
  const [addModal, setAddModal] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState({});
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { setError } = AppCont.useContainer();
  useEffect(() => {
    async function getAddress() {
      let { result, error } = await requestApi('getAddress');
      if (error) return setError(error);
      setAddressList(result);
    }

    getAddress();
  }, [setError]);
  const addAddress = useRunning(async values => {
    let { result, error } = await requestApi('postAddress', values);
    if (error) return setError(error);
    setAddressList(lists => ({
      ...lists,
      addresses: lists.addresses.concat(result)
    }));
  });

  const modifiedAddress = useRunning(async values => {
    let { result, error } = await requestApi('putAddress', {
      address_id: address.id,
      ...values
    });
    if (error) return setError(error);
    setAddressList(lists => ({
      ...lists,
      addresses: lists.addresses.map(item => {
        if (item.id === result.id) {
          return {
            ...item,
            ...result
          };
        }
        return item;
      })
    }));
  });

  const deleteAddress = useRunning(async list => {
    let { error } = await requestApi('deleteAddress', { address_id: list.id });
    if (error) return setError(error);
    setError('操作成功.', 'success');
    setAddressList(lists => ({
      ...lists,
      addresses: lists.addresses.filter(item => item.id !== list.id)
    }));
  });
  const { addresses = [], default_address_id } = addressList;

  return (
    <Slider open={props.open} bgColor="#f8f8f8">
      <Grid container>
        <BackHeader
          title={props.title}
          back={props.onClose}
          withoutHome={true}
        />

        <Grid item xs={12} style={{ background: '#fff' }}>
          <Button
            variant="text"
            className={classes.button}
            endIcon={<ArrowForwardIosRoundedIcon />}
            onClick={() => {
              setAddress({});
              setAddModal(true);
            }}
          >
            添加收货地址
          </Button>
          <Divider />
        </Grid>

        <Grid item xs={12} style={{ overflow: 'auto', height: '86vh' }}>
          {addresses.map(item => (
            <Grid key={item.id} item xs={12} sm={4} dm={3}>
              <AddressItem
                addressItem={item}
                onDelete={deleteAddress}
                default_id={default_address_id}
                onEditor={() => {
                  setAddress(item);
                  setAddModal(true);
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Slider open={addModal} bgColor="#f8f8f8">
          <EditorAddress
            isDefault={address.id === default_address_id}
            back={() => {
              setAddModal(false);
            }}
            initValue={address}
            onSubmit={async values => {
              if (address.id) {
                await modifiedAddress(values);
              } else {
                await addAddress(values);
              }
              //重置
              setAddModal(false);
              setAddress({});
            }}
          />
        </Slider>
      </Grid>
      <Dialog
        open={deleteDialog}
        text="删除后无法回复，确定吗？"
        onClose={() => setDeleteDialog(false)}
      ></Dialog>
    </Slider>
  );
}

Address.defaultProps = {
  title: '收货地址'
};
