// https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isIOS from './isIOS';
const envIOS = isIOS();

const ClickOutside = props => {
  const { onClickOutside, as, ...restProps } = props;
  const containerRef = useRef();
  const cbRef = useRef();
  const isTouchRef = useRef(false);
  useLayoutEffect(() => {
    cbRef.current = onClickOutside;
  });
  useLayoutEffect(() => {
    let timer = null;
    function docClick(e) {
      if (e.type === 'touchend') isTouchRef.current = true;
      if (e.type === 'click' && isTouchRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        timer = setTimeout(() => {
          cbRef.current && cbRef.current();
          // FIXME, 360ms delay to be compatible with click event delay, could be better
        }, 360);
      }
    }
    if (envIOS) {
      document.addEventListener('touchend', docClick, true);
    }
    document.addEventListener('click', docClick, true);
    return () => {
      clearTimeout(timer);
      if (envIOS) {
        document.removeEventListener('touchend', docClick, true);
      }
      document.removeEventListener('click', docClick, true);
    };
  }, []);

  const Tag = `${as}`;
  return (
    <Tag ref={containerRef} {...restProps}>
      {props.children}
    </Tag>
  );
};

ClickOutside.defaultProps = {
  as: 'div'
};

ClickOutside.propTypes = {
  as: PropTypes.string,
  onClickOutside: PropTypes.func.isRequired
};

export default ClickOutside;
