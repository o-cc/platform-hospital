import React, { useRef, useEffect } from 'react';
import Slider from 'pages/components/Slider';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { makeStyles, IconButton, Grid } from '@material-ui/core';
import BackHeader from 'pages/components/BackHeader';
import { editorContent } from 'configs/test_data';
const useStyles = makeStyles(t => ({
  editor: {
    height: 'calc(100vh - 49px)'
  },
  release: {
    fontSize: 14,
    color: '#666'
  }
}));

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['image'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean']
];

export default props => {
  const textRef = useRef();
  const quillRef = useRef(null);
  const classes = useStyles();
  useEffect(() => {
    if (!props.open) return;

    setTimeout(() => {
      quillRef.current = new Quill(textRef.current, {
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: '说点什么吧...',
        theme: 'snow'
      });
      quillRef.current.setContents &&
        quillRef.current.setContents(editorContent.ops);
    }, 10);
    return () => {
      quillRef.current = null;
    };
  }, [props.open]);
  return (
    <Slider open={props.open}>
      <BackHeader
        back={props.onClose}
        title=""
        homeComponent={() => (
          <IconButton
            className={classes.release}
            onClick={() => {
              let delta =
                quillRef.current.getContents && quillRef.current.getContents();
              //post
              console.log(JSON.stringify(delta));
            }}
          >
            发布
          </IconButton>
        )}
      />
      <Grid
        container
        direction="column"
        wrap="nowrap"
        className={classes.editor}
      >
        <div ref={textRef}></div>
      </Grid>
    </Slider>
  );
};
