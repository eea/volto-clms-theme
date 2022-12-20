import React from 'react';
import { CclTabs } from '@eeacms/volto-clms-theme/components/CclTab';
import { useDispatch, useSelector } from 'react-redux';
import { searchContent } from '@plone/volto/actions';

const CclFAQBlock = (props) => {
  const dispatch = useDispatch();
  const path = useSelector((state) => state.router.location.pathname);
  const searchState = useSelector((state) => state.search);
  React.useEffect(() => {
    dispatch(
      searchContent(path, {
        fullobjects: 1,
        portal_type: 'FAQ',
      }),
    );
  }, [path, dispatch]);

  return (
    <CclTabs routing={true}>
      <div tabTitle="General Info">KK</div>
      <div tabTitle="General 2">KK</div>
      <div tabTitle="General 3">KK</div>
      <div tabTitle="General 4">KK</div>
      <div tabTitle="General 5">KK</div>
      <div tabTitle="General 6">KK</div>
      <div tabTitle="General 7">KK</div>
      <div tabTitle="General 8">KK</div>
    </CclTabs>
  );
};

export default CclFAQBlock;
