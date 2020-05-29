import React, { useState } from 'react';
import { Grid, Button, makeStyles, Divider } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import Slider from '@/pages/components/Slider';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { vw } from '@/utils';
import AddressItem from './Child/item';
import EditorAddress from './Child/editor';
import { addressList as testList } from 'configs/test_data';
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
  const [addressList, setAddressList] = useState(testList);
  const [address, setAddress] = useState({});
  return (
    <Slider open={props.open}  bgColor="#f8f8f8" >
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
            onClick={() => setAddModal(true)}
          >
            添加收货地址
          </Button>
          <Divider />
        </Grid>
        <Grid item xs={12} style={{ overflow: 'auto', height: '86vh' }}>
          {addressList.map(item => (
            <Grid key={item.id} item xs={12} sm={4} dm={3}>
              <AddressItem
                addressItem={item}
                onDelete={() => {
                  console.log('delete');
                }}
                onEditor={() => {
                  setAddModal(true);
                  setAddress(item);
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Slider open={addModal} bgColor="#f8f8f8">
          <EditorAddress
            back={() => {
              setAddModal(false);
            }}
            initValue={address}
            onSubmit={values => {
              setAddModal(false);
              setAddressList(list => {
                return list.map(item => {
                  if (item.id === address.id) {
                    return {
                      ...item,
                      ...values
                    };
                  }
                  return {
                    ...item
                  };
                });
              });
              //重置
              setAddress({});
            }}
          />
        </Slider>
      </Grid>
    </Slider>
  );
}

Address.defaultProps = {
  title: '收货地址'
};
