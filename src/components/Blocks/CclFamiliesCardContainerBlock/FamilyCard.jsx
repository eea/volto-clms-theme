import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@eeacms/volto-clms-utils/components';
import { Link } from 'react-router-dom';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

const FamilyCard = (props) => {
  const {
    children,
    card,
    onClickImage = () => {
      return '';
    },
    isEditMode,
  } = props;

  const [hasLink, setHasLink] = useState(false);
  const href = card.href;

  useEffect(() => {
    if (isEditMode) {
      setHasLink(false);
    } else {
      if (card.href) {
        if (card.href && card.href.length > 0) {
          setHasLink(true);
        }
        if (card.href.length === 0) {
          setHasLink(false);
        }
      }
    }
  }, [isEditMode, card.href]);

  const url = hasLink && isInternalURL(href) ? flattenToAppURL(href) : href;
  const As = hasLink && isInternalURL(url) ? Link : 'a';

  return (
    <As
      href={hasLink ? url : null}
      to={hasLink ? url : null}
      className={'card-product-family'}
      onClick={() => {
        onClickImage();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }}
      onKeyDown={() => {
        onClickImage();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }}
    >
      <div className="card-text">
        <div className="card-product-familiy-title">{card?.title}</div>
        <div>
          <div className="card-product-familiy-description">
            {card?.description}
          </div>
        </div>
        {children}
      </div>
      <div className="card-icon">
        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
      </div>
    </As>
  );
};

export default FamilyCard;
