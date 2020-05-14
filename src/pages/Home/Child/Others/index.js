import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppCont from 'container';
import SubTabs from 'pages/Home/components/SubTabs';

function Other() {
  let { menuType } = useParams();
  const { menuLists } = AppCont.useContainer().state;
  const [lists, setLists] = useState();

  const getMenuListByType = useCallback(() => {
    for (let i = 0; i < menuLists.length; i++) {
      if (menuType === menuLists[i].type) {
        return menuLists[i];
      }
    }
    return {};
  }, [menuLists, menuType]);

  useEffect(() => {
    const lists = getMenuListByType().subTitle || [];
    setLists(lists);
  }, [getMenuListByType]);
  return (
    <>
      {/* sub nav */}
      <SubTabs lists={lists} />
    </>
  );
}

export default Other;
