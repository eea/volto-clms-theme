import React from 'react';
import { Label } from 'semantic-ui-react';
import { ResultContext } from '@eeacms/search';
import { Link } from 'react-router-dom';
import { UniversalCard } from '@eeacms/volto-listing-block';
import './search-styles.less';

const TechnicalLibraryItem = (props) => {
  const { result } = props;

  // console.log(result);
  const item = {
    title: (
      <>
        <Link to={result.href} title={result.title}>
          {result.title}
          {result.isNew && <Label className="new-item">New</Label>}
          {result.isExpired && (
            <Label className="archived-item">Archived</Label>
          )}
        </Link>
      </>
    ),
    description: <ResultContext {...props} />,
    preview_image_url: result.hasImage ? result.thumbUrl : undefined,
    extra: (
      <div className="result-bottom">
        <strong>Publication date: </strong>
        <span>01.04.2025</span> &nbsp;<strong>Version: </strong>{' '}
        <span>1.2</span>
        <div className="card-doc-size">888 KB</div>
      </div>
    ),
  };

  const itemModel = {
    hasImage: result.hasImage,
    hasDescription: false,
    '@type': 'searchItem',
  };

  return <UniversalCard item={item} itemModel={itemModel} />;
};

export default TechnicalLibraryItem;
