import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@plone/volto/components';
import { useDispatch, useSelector } from 'react-redux';
import { Popup, Segment, Divider, Message } from 'semantic-ui-react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import clearSVG from '@plone/volto/icons/clear.svg';
import {
  getDatasetTimeseries,
  getNutsNames,
  getDatasetsByUid,
} from '@eeacms/volto-clms-theme/actions';
import { getCartItems } from '@eeacms/volto-clms-utils/actions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const onlyInLeft = (left, right, compareFunction) =>
  left.filter(
    (leftValue) =>
      !right.some((rightValue) => compareFunction(leftValue, rightValue)),
  );

export const CartIconCounter = () => {
  const datasetTimeseries = useSelector((state) => state.datasetTimeseries);
  const nutsnames = useSelector((state) => state.nutsnames);
  const datasetsByUid = useSelector((state) => state.datasetsByUid);
  const cartState = useSelector((state) => state.cart_items);
  const cartState_ref = useRef(cartState);
  const cart_icon_ref = React.useRef();
  const intl = useSelector((state) => state.intl);
  const isDownload = useSelector((state) => state.downloadtool.loading);
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
      cartState.items.length >= cartState_ref.current.items.length &&
      !isDownload
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
          style={{ maxWidth: '500px' }}
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
              {cartDiffItems.some((cdi) => !cdi.area?.type) && (
                <p>
                  You added{' '}
                  <strong>
                    {cartDiff} new prepackaged item{cartDiff > 1 ? 's' : ''}
                  </strong>{' '}
                  to the cart.
                </p>
              )}
              {datasetsByUid.loaded &&
                nutsnames.loaded &&
                cartDiffItems.map((cdi, key) => {
                  const ddata = datasetsByUid.loaded
                    ? datasetsByUid?.datasets?.items.find(
                        (d) => d.UID === cdi.UID,
                      )
                    : {};
                  return (
                    <p key={key}>
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
            onClick={() => setshowPopup(false)}
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

export default CartIconCounter;
