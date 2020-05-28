import React, { useState } from 'react';
import Slider from 'pages/components/Slider';
import BackHeader from '@/pages/components/BackHeader';
import { IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Editor from './Editor';
const useStyles = makeStyles(theme => ({
  release: {
    fontSize: 16,
    color: '#f90'
  }
}));

export default props => {
  const classes = useStyles();
  const [editorModal, setEditorModal] = useState(false);
  return (
    <Slider open={props.open}>
      <BackHeader
        back={props.onClose}
        title=""
        homeComponent={() => (
          <IconButton className={classes.release}>发布</IconButton>
        )}
      />
      <div
        style={{
          padding: 8,
          height: 'calc(100vh - 106px)',
          overflow: 'auto'
        }}
      >
        <h1>你总说 时间还很多</h1>
        <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
        <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
      </div>
      <Button
        fullWidth
        variant="contained"
        size="large"
        color="secondary"
        onClick={() => {
          setEditorModal(true);
        }}
      >
        编辑
      </Button>

      <Editor
        open={editorModal}
        onClose={() => {
          setEditorModal(false);
        }}
      />
    </Slider>
  );
};
