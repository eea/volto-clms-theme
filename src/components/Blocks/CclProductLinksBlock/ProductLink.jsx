import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

const ProductLink = (props) => {
  const {
    card,
    onClickImage = () => {
      return '';
    },
    isEditMode,
  } = props;

  const [hasLink, setHasLink] = useState(false);
  const href = card.url?.[0]?.['@id'] || card.url;

  useEffect(() => {
    if (isEditMode) {
      setHasLink(false);
    } else {
      if (card.url) {
        if (card.url && card.url.length > 0) {
          setHasLink(true);
        }
        if (card.url.length === 0) {
          setHasLink(false);
        }
      }
    }
  }, [isEditMode, card.url]);

  const url = hasLink && isInternalURL(href) ? flattenToAppURL(href) : href;
  const As = hasLink && isInternalURL(url) ? Link : 'a';

  return (
    <As
      href={hasLink ? url : null}
      to={hasLink ? url : null}
      onClick={() => {
        onClickImage();
        if (isEditMode === false)
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
      }}
      onKeyDown={() => {
        onClickImage();
        if (isEditMode === false)
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
      }}
      className={hasLink ? 'card-with-link' : ''}
    >
      {card?.title || 'New link title'}
    </As>
  );
};

export default ProductLink;
