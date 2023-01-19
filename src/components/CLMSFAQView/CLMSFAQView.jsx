import React from 'react';

import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';

const CLMSFAQView = (props) => {
  const { content } = props;

  return (
    <div className="ccl-container">
      <>
        <h1 className="page-title">{content.title}</h1>
        <div className="faq-detail">
          <RenderBlocks {...props} />
        </div>
      </>
    </div>
  );
};

export default CLMSFAQView;
