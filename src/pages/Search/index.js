import React from 'react';
import AppCont from 'container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ItemList from 'pages/components/ListItem';
import { vw, requestApi, getQueryKey } from '@/utils';
import InfiniteScroll from 'react-infinite-scroller';
import PageTemplate from '../components/PageTemplate';
import { Typography } from '@material-ui/core';
import useWidth from '@/hooks/useWidth';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    maxWidth: '1300px',
    margin: 'auto',
    minHeight: 'calc(100vh - 100px)',
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
      <div
        className={classes.root}
        style={{ marginTop: width === 'xs' ? undefined : '82px' }}
      >
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
          <Box style={{ padding: `0 ${vw(30)}`, overflowY: 'hidden' }} p={3}>
            <ItemList list={results} />
          </Box>
          {results.length <= 0 && (
            <Typography variant="subtitle2" color="textSecondary" align='center'>
              暂时没有数据~
            </Typography>
          )}
        </InfiniteScroll>
      </div>
    </PageTemplate>
  );
}

export default Other;
