import React from 'react';
import { useState } from 'react';
import { Label } from 'semantic-ui-react';
import { ResultContext } from '@eeacms/search';
import { Link } from 'react-router-dom';
import { UniversalCard } from '@eeacms/volto-listing-block';
import './search-styles.less';
import { Icon as VoltoIcon } from '@plone/volto/components';
import penSVG from '@plone/volto/icons/pen.svg';
import { useSelector } from 'react-redux';
import { cclDateFormat } from '@eeacms/volto-clms-theme/components/CclUtils';

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
  const userSession = useSelector((state) => state.userSession);
  const isAuthenticated = !!userSession.token;
  const roles = userSession?.user?.roles || [];
  const [showCategories, setShowCategories] = useState(false);

  const isAdmin = roles.includes('Manager') || isAuthenticated; // TODO fix this
  // const isAdmin = false;

  const item = {
    title: (
      <>
        <div className="technical-library-title">
          <Link
            to={result.href}
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
        {isAdmin && (
          <div>
            <strong
              onClick={() => setShowCategories((prev) => !prev)}
              role="button"
              tabIndex={0}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault(); // important pentru Space
                  setShowCategories((prev) => !prev);
                }
              }}
            >
              Categorization
              <span style={{ marginLeft: '8px' }}>
                {showCategories ? '▾' : '▸'}
              </span>
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
