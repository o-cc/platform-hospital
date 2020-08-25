import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideInPC from 'pages/components/sideInPC';
import useWidth from '@/hooks/useWidth';
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
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
    overflow: 'hidden'
  }
}));
export default function PCTemplate(props) {
  const classes = useStyles();
  const width = useWidth();
  const { renderSide, withoutBg } = props;
  return (
    <>
      {width === 'xs' ? (
        props.children
      ) : (
        <div className={classes.root}>
          <div
            className={classes.mainColumn}
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

PCTemplate.defaultProps = {
  renderSide: () => null
};
