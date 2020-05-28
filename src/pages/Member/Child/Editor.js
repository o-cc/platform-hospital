import React, { useRef, useEffect } from 'react';
import Slider from 'pages/components/Slider';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
export default props => {
  const textRef = useRef();

  useEffect(() => {
 
    if (props.open) {
      setTimeout(() => {
      new Quill(textRef.current, {
        modules: { toolbar: '#toolbar' },
        theme: 'snow',
        placeholder: '说什么吧....',
        // formats: ["underline", "image"]
      });
      }, 10);
      
    }
  }, [props.open]);
  return (
    <Slider open={props.open}>
      <h1>ddd</h1>
      <div id="toolbar">
        <button className="ql-bold">Bold</button>
        <button className="ql-italic">Italic</button>
        <button className="ql-underline">Italic</button>
        <button className="ql-image">Italic</button>
      </div>

      <div className="" ref={textRef}>
      </div>
    </Slider>
  );
};
