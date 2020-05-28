import React, { useState, useRef, useEffect } from 'react';
import Slider from 'pages/components/Slider';
import BackHeader from '@/pages/components/BackHeader';
import { IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Editor from './Editor';
import Quill from 'quill';
import { editorContent } from '@/configs/test_data';

const useStyles = makeStyles(theme => ({
  release: {
    fontSize: 16,
    color: '#666'
  },
  editor: {
    padding: 8,
    height: 'calc(100vh - 95px)',
    overflow: 'auto',
    border: '0!important'
  }
}));

export default props => {
  const classes = useStyles();
  const [editorModal, setEditorModal] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  useEffect(() => {
    if (!props.open) return;

    setTimeout(() => {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: false
        },
        readOnly: true
      });

      quillRef.current.setContents &&
        quillRef.current.setContents(editorContent.ops);
    }, 10);
    return () => {
      console.log('destroy');
      quillRef.current = null;
    };
  }, [props.open]);
  return (
    <Slider open={props.open}>
      <BackHeader
        back={props.onClose}
        title=""
        homeComponent={() => (
          <IconButton className={classes.release}>发布</IconButton>
        )}
      />
      <div className={classes.editor} ref={editorRef}></div>
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
