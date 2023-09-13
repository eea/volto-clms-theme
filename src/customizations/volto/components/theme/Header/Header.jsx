/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/**
 * Header component.
 * @module components/theme/Header/Header
 */

import { FormattedMessage, injectIntl } from 'react-intl';
import { Logo, Navigation, SearchWidget, Icon } from '@plone/volto/components';
import React, { Component, useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Popup, Segment, Divider, Message } from 'semantic-ui-react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import clearSVG from '@plone/volto/icons/clear.svg';

import { BodyClass } from '@plone/volto/helpers';
// IMPORT isnt nedded until translations are created
// import CclLanguageSelector from '@eeacms/volto-clms-theme/components/CclLanguageSelector/CclLanguageSelector';
import CclLoginModal from '@eeacms/volto-clms-theme/components/CclLoginModal/CclLoginModal';
import CclTopMainMenu from '@eeacms/volto-clms-theme/components/CclTopMainMenu/CclTopMainMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { getCartItems } from '@eeacms/volto-clms-utils/actions';
import { getUser } from '@plone/volto/actions';
import jwtDecode from 'jwt-decode';
import {
  getDatasetTimeseries,
  getNutsNames,
  getDatasetsByUid,
} from '../../../../../actions';

const onlyInLeft = (left, right, compareFunction) =>
  left.filter(
    (leftValue) =>
      !right.some((rightValue) => compareFunction(leftValue, rightValue)),
  );

const CartIconCounter = (props) => {
  const datasetTimeseries = useSelector((state) => state.datasetTimeseries);
  const nutsnames = useSelector((state) => state.nutsnames);
  const datasetsByUid = useSelector((state) => state.datasetsByUid);
  const cartState = useSelector((state) => state.cart_items);
  const cartState_ref = useRef(cartState);
  const cart_icon_ref = React.useRef();
  const intl = useSelector((state) => state.intl);
  const user_id = useSelector((state) => state.users.user.id);
  const [showPopup, setshowPopup] = useState(false);
  const [cartDiff, setCartDiff] = useState(0);
  const [cartDiffItems, setCartDiffItems] = useState([]);
  const [hasTimeseries, setHasTimeseries] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems(user_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  useEffect(() => {
    if (cartDiff > 0) {
      cartDiffItems.forEach((newItem) => {
        if (
          !datasetTimeseries.loading &&
          datasetTimeseries?.datasets[newItem.UID] === undefined
        ) {
          dispatch(getDatasetTimeseries(newItem.UID));
        }
        if (newItem.area?.type) {
          dispatch(getNutsNames(newItem.area?.value));
          dispatch(getDatasetsByUid(newItem.UID));
        }
      });
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartDiffItems]);

  useEffect(() => {
    let hasTS = false;
    if (datasetTimeseries.datasets) {
      cartDiffItems.forEach((diffItem) => {
        if (
          datasetTimeseries.datasets[diffItem.UID] &&
          datasetTimeseries.datasets[diffItem.UID].start
        ) {
          hasTS = true;
        }
      });
    }
    setHasTimeseries(hasTS);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasetTimeseries.datasets, datasetTimeseries.loaded, cartDiffItems]);

  useEffect(() => {
    if (
      cartState_ref.current.set.loading &&
      cartState.set.loaded &&
      cartState.items.length >= cartState_ref.current.items.length
    ) {
      setCartDiff(cartState.items.length - cartState_ref.current.items.length);
      setCartDiffItems(
        onlyInLeft(
          cartState.items,
          cartState_ref.current.items,
          (l, r) => l.unique_id === r.unique_id,
        ),
      );

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      !showPopup && setTimeout(() => setshowPopup(true), 900);
      setTimeout(() => {
        setshowPopup(false);
      }, 11000);
    }
    cartState_ref.current = cartState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartState]);
  return (
    cartState.items && (
      <>
        <Popup
          context={cart_icon_ref}
          open={showPopup}
          position="bottom center"
          flowing
        >
          <Segment
            attached="top"
            style={{ padding: 0, display: 'flex', justifyContent: 'flex-end' }}
          >
            <Icon
              onClick={() => setshowPopup(false)}
              name={clearSVG}
              size={20}
              style={{ cursor: 'pointer' }}
            />
          </Segment>
          <Divider horizontal style={{ margin: 0 }}>
            My cart
          </Divider>
          {cartDiff > 0 ? (
            <Message positive>
              {cartDiffItems.some((cdi) => cdi.area === '') && (
                <p>
                  You added{' '}
                  <strong>
                    {cartDiff} new prepackaged item{cartDiff > 1 ? 's' : ''}
                  </strong>{' '}
                  to the cart.
                </p>
              )}
              {cartDiffItems.length > 0 &&
                datasetsByUid.loaded &&
                nutsnames.loaded &&
                cartDiffItems.map((cdi) => {
                  const ddata = datasetsByUid.loaded
                    ? datasetsByUid?.datasets?.items.find(
                        (d) => d.UID === cdi.UID,
                      )
                    : {};
                  return (
                    <p>
                      <strong>Name:</strong> {ddata?.title} <br />
                      <strong>Area:</strong>{' '}
                      {nutsnames?.nutsnames?.[cdi?.area?.value]}
                    </p>
                  );
                })}
              {hasTimeseries && (
                <>
                  <br />
                  Click on Go to cart to select time interval.
                </>
              )}
            </Message>
          ) : (
            <Message warning>
              The items you tried to add were already added
            </Message>
          )}
          <CclButton
            mode="filled"
            to={`/${intl.locale}/cart`}
            style={{ width: '100%' }}
          >
            Go to cart
          </CclButton>
        </Popup>
        <Link
          to={`/${intl.locale}/cart`}
          className="header-login-link"
          ref={cart_icon_ref}
        >
          <FontAwesomeIcon
            icon={['fas', 'shopping-cart']}
            style={{ marginRight: '0.25rem', maxWidth: '1.5rem' }}
          />
          <strong>{cartState?.items?.length}</strong>
        </Link>
      </>
    )
  );
};

const HeaderDropdown = ({ user }) => {
  const intl = useSelector((state) => state.intl);
  return (
    <>
      <span>
        <FontAwesomeIcon
          icon={['fas', 'user']}
          style={{ marginRight: '0.5rem' }}
        />
        {user?.fullname || user?.id || ''}
        <span className="ccl-icon-chevron-thin-down"></span>
      </span>
      <ul>
        <li>
          <Link to={`/${intl.locale}/profile`} className="header-login-link">
            My settings
          </Link>
        </li>
        <li>
          <Link
            to={`/${intl.locale}/cart-downloads`}
            className="header-login-link"
          >
            Downloads
          </Link>
        </li>
        <li>
          <Link
            to={`/${intl.locale}/all-downloads`}
            className="header-login-link"
          >
            Historic downloads
          </Link>
        </li>
        <li>
          <Link to="/logout" className="header-login-link">
            <FormattedMessage id="logout" defaultMessage="Logout" />
          </Link>
        </li>
      </ul>
    </>
  );
};

/**
 * Header component class.
 * @class Header
 * @extends Component
 */

class Header extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    user: PropTypes.shape({
      fullname: PropTypes.string,
      email: PropTypes.string,
      home_page: PropTypes.string,
      location: PropTypes.string,
      roles: PropTypes.array,
    }).isRequired,
    getUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUser(this.props.token);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.token !== this.props.token) {
      this.props.getUser(nextProps.token);
    }
    if (nextProps.user.id !== this.props.user.id) {
      this.props.getCartItems(this.props?.user?.id);
    }
  }

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      mobileMenuOpen: false,
      mobileSearchBoxOpen: false,
    };
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div>
        <header className="ccl-header">
          {/* Body class depending on sections */}
          <BodyClass className="ccl-style ccl-color_land" />

          <div className="ccl-header-tools">
            <div className="ccl-container">
              <div
                className="ccl-main-menu-collapse-button"
                onClick={() =>
                  this.setState({
                    mobileMenuOpen: !this.state.mobileMenuOpen,
                  })
                }
                onKeyDown={() =>
                  this.setState({
                    mobileMenuOpen: !this.state.mobileMenuOpen,
                  })
                }
                tabIndex="0"
                role="button"
              >
                <span
                  className={
                    this.state.mobileMenuOpen
                      ? 'ccl-icon-close'
                      : 'ccl-icon-menu'
                  }
                ></span>
              </div>
              <div
                className="ccl-search-collapse-button"
                onClick={() =>
                  this.setState({
                    mobileSearchBoxOpen: !this.state.mobileSearchBoxOpen,
                  })
                }
                onKeyDown={() =>
                  this.setState({
                    mobileSearchBoxOpen: !this.state.mobileSearchBoxOpen,
                  })
                }
                tabIndex="0"
                role="button"
              >
                <span className="ccl-icon-zoom"></span>
              </div>

              <div className="ccl-header-tools-container">
                <ul className="ccl-header-menu-tools">
                  <CclTopMainMenu></CclTopMainMenu>
                  <li className="header-vertical-line">
                    <div>|</div>
                  </li>
                  {(this.props.user?.id && (
                    <>
                      <li className="header-dropdown">
                        <HeaderDropdown user={this.props.user} />
                      </li>
                      <li>
                        <CartIconCounter />
                      </li>
                    </>
                  )) || (
                    <li>
                      <CclLoginModal />
                    </li>
                  )}
                  <li className="header-vertical-line">
                    <div>|</div>
                  </li>
                </ul>
                <div
                  className={
                    this.state.mobileSearchBoxOpen
                      ? 'ccl-header-search-show'
                      : 'ccl-header-search-hidden'
                  }
                >
                  <SearchWidget
                    pathname={this.props.pathname}
                    setHeaderState={(p) => {
                      this.setState(p);
                    }}
                  />
                </div>
                {/* Language selector wont be shown until translations are completed */}
                {/* <CclLanguageSelector /> */}
              </div>
            </div>
          </div>
          <div className="ccl-header-nav ">
            <div className="ccl-container">
              <Logo />
              <nav
                className={
                  this.state.mobileMenuOpen
                    ? 'ccl-main-menu ccl-collapsible-open'
                    : 'ccl-main-menu'
                }
              >
                <Navigation
                  pathname={this.props.pathname}
                  setHeaderState={(p) => {
                    this.setState(p);
                  }}
                />
                <ul className="ccl-header-menu-tools ccl-collapsible-toolmenu">
                  <CclTopMainMenu></CclTopMainMenu>
                  <li className="header-vertical-line">
                    <div>|</div>
                  </li>
                  {(this.props.user.id && this.state.mobileMenuOpen && (
                    <>
                      <li className="header-dropdown">
                        <HeaderDropdown user={this.props.user} />
                      </li>
                      <li>
                        <CartIconCounter />
                      </li>
                    </>
                  )) || (
                    <li>
                      <CclLoginModal />
                    </li>
                  )}
                  <li className="header-vertical-line">
                    <div>|</div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <hr />
        </header>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      locale: state.intl.locale,
      cart: state.cart_items.items,
      user: state.users.user,
      token: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      rawtoken: state.userSession.token,
    }),
    { getUser, getCartItems },
  ),
)(Header);
