import { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { getBreadcrumbs } from '@plone/volto/actions';
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';

import PropTypes from 'prop-types';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  breadcrumbs: {
    id: 'Breadcrumbs',
    defaultMessage: 'Breadcrumbs',
  },
});

const BreadcrumbsComponent = ({ pathname }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { pathname: realPath } = useLocation();
  const noBreadCrumbsItems = [];

  const items = useSelector(
    (state) =>
      realPath.endsWith('/cart') ||
      realPath.endsWith('profile') ||
      realPath.endsWith('cart-downloads') ||
      realPath.endsWith('all-downloads')
        ? noBreadCrumbsItems
        : state.breadcrumbs.items,
    shallowEqual,
  );
  const root = useSelector((state) => state.breadcrumbs.root);

  useEffect(() => {
    if (!hasApiExpander('breadcrumbs', getBaseUrl(pathname))) {
      dispatch(getBreadcrumbs(getBaseUrl(pathname)));
    }
  }, [dispatch, items, pathname]);

  return (
    <>
      {items.length > 0 && (
        <nav
          aria-label={intl.formatMessage(messages.breadcrumbs)}
          className="ccl-breadcrumb"
        >
          <Container>
            <span className="ccl-u-sr-only">You are here:</span>
            <ol className="ccl-breadcrumb__segments-wrapper">
              <li className="ccl-breadcrumb__segment ccl-breadcrumb__segment--first">
                <Link
                  to={root || '/'}
                  className="ccl-link ccl-link--inverted ccl-link--standalone ccl-breadcrumb__link"
                  title={intl.formatMessage(messages.home)}
                >
                  {intl.formatMessage(messages.home)}
                </Link>
              </li>
              {items?.map((item, index, items) => [
                index < items.length - 1 ? (
                  <li key={index} className="ccl-breadcrumb__segment">
                    <Link
                      to={item.url}
                      className="ccl-link ccl-link--inverted ccl-link--standalone ccl-breadcrumb__link"
                    >
                      {item.title}
                    </Link>
                  </li>
                ) : (
                  <li
                    key={index}
                    className="ccl-breadcrumb__segment ccl-breadcrumb__segment--last"
                  >
                    <span>{item.title}</span>
                  </li>
                ),
              ])}
            </ol>
          </Container>
        </nav>
      )}
    </>
  );
};

BreadcrumbsComponent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default BreadcrumbsComponent;
