import { Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
import React from 'react';
import { searchContent } from '@plone/volto/actions';
import { useLocation } from 'react-router-dom';

const RelatedItems = (props) => {
  const dispatch = useDispatch();
  const { UID, id, type } = props;
  let hash = '';
  if (type === 'News Item') {
    hash = '#News';
  } else if (type === 'UseCase') {
    hash = '#Use-cases';
  }
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  let libraries = searchSubrequests?.[id]?.items || [];
  let librariesPending = searchSubrequests?.[id]?.loading;
  const location = useLocation();
  React.useEffect(() => {
    if (location.hash === hash && UID && hash) {
      dispatch(
        searchContent(
          '',
          {
            fullobjects: 1,
            portal_type: type,
            path: '/',
            associated_datasets: UID,
          },
          id,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, UID, dispatch, location]);

  return (
    <div>
      {librariesPending && <Loader active inline="centered" />}
      {libraries.length > 0 ? (
        libraries.map((item, index) => (
          <CclCard
            key={index}
            type={null}
            card={{ Type: item['@type'], ...item }}
          />
        ))
      ) : (
        <p>There are no related items.</p>
      )}
    </div>
  );
};

export default RelatedItems;
