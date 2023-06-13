import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVocabulary } from '@plone/volto/actions';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { flattenToAppURL } from '@plone/volto/helpers';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';

import PropTypes from 'prop-types';

const CclListingCards = (props) => {
  const {
    items,
    linkHref,
    linkTitle,
    isEditMode,
    variation = 'doc',
    showDates = true,
  } = props;
  const dispatch = useDispatch();
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';
  const CATEGORIZATION_VOCABULARY_NAME =
    'collective.taxonomy.technical_library_categorization';
  const vocabularies_state = useSelector(
    (state) => state.vocabularies[CATEGORIZATION_VOCABULARY_NAME],
  );
  const user = useSelector((state) => state.users.user);
  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <UniversalLink href={href}>{linkTitle || href}</UniversalLink>;
  }
  let containerClass = '';
  if (['news', 'event'].includes(variation)) {
    containerClass = 'ccl-container';
  } else if (!['line', 'doc', 'globalSearch'].includes(variation)) {
    containerClass = 'card-container';
  }
  const hasTL = items.find(
    (i) => i?.taxonomy_technical_library_categorization?.length > 0,
  );
  React.useEffect(() => {
    if (hasTL && !vocabularies_state?.loaded) {
      dispatch(
        getVocabulary({ vocabNameOrURL: CATEGORIZATION_VOCABULARY_NAME }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasTL, dispatch]);
  return (
    <>
      <div className={containerClass}>
        {items && items.length > 0
          ? items.map((item, index) => (
              <CclCard
                key={index}
                type={variation}
                card={item}
                showDates={showDates}
                showEditor={user?.roles?.includes('Manager')}
              />
            ))
          : 'There are no items to display'}
      </div>
      {link && <div className="footer">{link}</div>}
    </>
  );
};

CclListingCards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkHref: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default CclListingCards;
