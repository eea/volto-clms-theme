import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';

const CclTechnicalLibrariesListView = (props) => {
  const { data, id, properties, metadata } = props;
  const dispatch = useDispatch();
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const path = metadata ? metadata['@id'] : properties['@id'];
  let libraries = searchSubrequests?.[props.id]?.items || [];

  React.useEffect(() => {
    dispatch(
      searchContent(
        path,
        {
          fullobjects: 1,
          portal_type: 'TechnicalLibrary',
          path: '/',
          associated_products: metadata['id'],
        },
        id,
      ),
    );
  }, [path, data, id, metadata, dispatch]);

  return (
    <>
      <div className="technical-libraries">
        {libraries.map((item, index) => (
          <CclCard key={index} type="doc" card={item} />
        ))}
      </div>
    </>
  );
};

export default CclTechnicalLibrariesListView;
