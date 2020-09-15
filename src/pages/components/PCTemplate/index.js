import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideInPC from 'pages/components/sideInPC';
import useWidth from '@/hooks/useWidth';
const useStyles = makeStyles(theme => ({
  root: {
    height: '90%',
    width: '1000px',
    display: 'flex',
    alignItems: 'flex-start',
    margin: '10px auto',
    padding: theme.spacing(0, 2)
  },
  mainColumn: {
    width: '694px',
    flexShrink: 0,
    marginRight: '10px',
    marginBottom: 0,
    boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)',
    borderRadius: 2,
    overflow: 'auto',
    height: '100%'
  }
}));
function PCTemplate(props, ref) {
  const classes = useStyles();
  const width = useWidth();
  const { renderSide = () => null, withoutBg } = props;
  return (
    <>
      {width === 'xs' ? (
        <div ref={ref} style={{ height: 'calc(100vh - 105px)', overflow: 'auto' }}>
          {props.children}
        </div>
      ) : (
        <div className={classes.root}>
          <div
            className={classes.mainColumn}
            ref={ref}
            style={{ background: withoutBg ? 'none' : '#fff' }}
          >
            {props.children}
          </div>
          <SideInPC>{renderSide()}</SideInPC>
        </div>
      )}
    </>
  );
}

export default React.forwardRef(PCTemplate);
