import React from 'react';
import { TechnicalLibrariesListSchema } from './TechnicalLibrariesListSchema';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { useSelector, useDispatch } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';

const CclTechnicalLibrariesListEdit = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    selected,
    id,
    properties,
    metadata,
  } = props;
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
        <h2>Technical Libraries</h2>
        {libraries.map((item, index) => (
          <CclCard key={index} type="doc" card={item} />
        ))}
      </div>
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={TechnicalLibrariesListSchema()}
          title="TechnicalLibraries List block"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};

export default CclTechnicalLibrariesListEdit;
