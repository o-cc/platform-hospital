// polyfill
import 'blueimp-canvas-to-blob';
import loadImage from 'blueimp-load-image';
import React from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/blueimp-load-image#options
const defaultOptions = {
  maxWidth: 750,
  orientation: true,
  canvas: true
};

const ImagePicker = props => {
  const { accept, options, onValidate, onPick, ...resetProps } = props;
  return (
    <input
      {...resetProps}
      type="file"
      accept={accept}
      onChange={e => {
        const file = e.target.files[0];
        if (!onValidate || onValidate(file)) {
          loadImage(
            file,
            (canvas, data) => {
              onPick && onPick(canvas, data);
            },
            {
              ...defaultOptions,
              ...options
            }
          );
        }
      }}
    />
  );
};

ImagePicker.defaultProps = {
  accept: 'image/*'
};

ImagePicker.propTypes = {
  accept: PropTypes.string,
  options: PropTypes.object,
  onValidate: PropTypes.func,
  onPick: PropTypes.func
};

export default ImagePicker;
