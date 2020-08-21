import React from 'react';
import AppCont from 'container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ItemList from 'pages/components/ListItem';
import { vw, requestApi, getQueryKey } from '@/utils';
import InfiniteScroll from 'react-infinite-scroller';
import PageTemplate from '../components/PageTemplate';
import useWidth from '@/hooks/useWidth';
import { Typography } from '@material-ui/core';
import PCTemplate from '../components/PCTemplate';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    margin: 'auto',
    minHeight: 'calc(100vh - 105px)',
    marginTop: theme.spacing(6)
  },
  tabs: {
    justifyContent: 'space-around',
    borderBottom: '1px solid #ddd'
  }
}));

function Other() {
  const { setError, state, setSearchData } = AppCont.useContainer();
  const { searchData } = state;
  const classes = useStyles();

  const loadFunc = async () => {
    const next = searchData.next || '';
    const page = getQueryKey('page', next);
    const searchInfo = getQueryKey('search', next);

    let { result, error } = await requestApi('getSearch', {
      search: searchInfo,
      page
    });
    if (error) {
      return setError(error);
    }
    setSearchData({
      ...searchData,
      ...result,
      results: searchData.results.concat(result.results)
    });
  };
  const { next, results = [] } = searchData;
  const hasMore = next;
  const width = useWidth();
  return (
    <PageTemplate>
      <div className={width !== 'xs' ? '' : classes.root}>
        <PCTemplate screen={width}>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={!!hasMore}
            loader={
              <div style={{ textAlign: 'center' }} key={0}>
                正在加载...
              </div>
            }
          >
            <Box
              style={{ padding: `${vw(15)} ${vw(30)} 0`, overflowY: 'hidden' }}
              p={3}
            >
              <ItemList list={results} />
              {searchData.next && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  onClick={loadFunc}
                >
                  点击查看更多
                </Typography>
              )}
            </Box>
          </InfiniteScroll>
        </PCTemplate>
      </div>
    </PageTemplate>
  );
}

export default Other;
