import { Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
import React from 'react';
import { searchContent } from '@plone/volto/actions';
import { useLocation } from 'react-router-dom';

const RelatedUseCases = (props) => {
  const dispatch = useDispatch();
  const { UID, id } = props;
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  let libraries = searchSubrequests?.[id]?.items || [];
  let librariesPending = searchSubrequests?.[id]?.loading;
  const location = useLocation();
  React.useEffect(() => {
    if (location.hash === '#Use-cases' && UID) {
      dispatch(
        searchContent(
          '',
          {
            fullobjects: 1,
            portal_type: 'UseCase',
            path: '/',
            associated_datasets: UID,
          },
          id,
        ),
      );
    }
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

export default RelatedUseCases;
