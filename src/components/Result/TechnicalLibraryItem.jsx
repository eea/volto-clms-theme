import './search-styles.less';
import React from 'react';
import penSVG from '@plone/volto/icons/pen.svg';
import { Icon as VoltoIcon } from '@plone/volto/components';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ResultContext } from '@eeacms/search';
import { UniversalCard } from '@eeacms/volto-listing-block';
import { cclDateFormat } from '@eeacms/volto-clms-theme/components/CclUtils';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${size} ${sizes[i]}`;
}

const TechnicalLibraryItem = (props) => {
  const { result } = props;
  const [showCategories, setShowCategories] = useState(false);
  const user = useSelector((state) => state.users.user);
  const isAdmin = user?.roles?.includes('Manager');
  const item = {
    title: (
      <>
        <div className="technical-library-title">
          <Link
            to={`${result.href}/@@download/file`}
            title={result.title}
            className="technical-library-title"
          >
            {result.title}
            {result.isNew && <Label className="new-item">New</Label>}
            {result.isExpired && (
              <Label className="archived-item">Archived</Label>
            )}
          </Link>
          {isAdmin && (
            <Link
              to={`${result.href}/edit`}
              target="_blank"
              rel="noopener noreferrer"
              className="technical-library-edit"
            >
              <VoltoIcon
                name={penSVG}
                size="12px"
                className="circled"
                title={'Edit'}
              />
            </Link>
          )}
        </div>
      </>
    ),
    description: <ResultContext {...props} />,
    preview_image_url: result.hasImage ? result.thumbUrl : undefined,
    extra: (
      <div className="result-bottom">
        <strong>Publication date: </strong>
        <span>{cclDateFormat(result.issued)}</span> &nbsp;
        <strong>Version: </strong> <span>{result.version.raw}</span>
        <div className="card-doc-size">
          {formatFileSize(result.file_size.raw)}
        </div>
        {isAdmin && Array.isArray(result.library_categories_values.raw) && (
          <div className="admin-info">
            <strong
              className="categorization-expand"
              onClick={() => setShowCategories((prev) => !prev)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setShowCategories((prev) => !prev);
                }
              }}
            >
              Categorization
              <span> {showCategories ? '▾' : '▸'}</span>
            </strong>

            {showCategories && (
              <ul>
                {result.library_categories_values.raw.map((categ, index) => (
                  <li key={index}>{categ}</li>
                ))}
              </ul>
            )}
          </div>
        )}
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
