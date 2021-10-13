import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCartItems } from '@eeacms/volto-clms-theme/actions';
import { Message } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
export const CART_SESSION_KEY = 'cart_session';

const useCartState = () => {
  // const [cart, setCart] = useState([]);
  const [savedToCard, setSavedToCard] = useState(false);
  const [toasTime, setToastTime] = useState(3000);
  const [CART_SESSION_USER_KEY, SET_CART_SESSION_USER_KEY] = useState();
  const isLoggedIn = useSelector((state) =>
    state.userSession.token ? jwtDecode(state.userSession.token).sub : '',
  )
    ? true
    : false;

  const user_id = useSelector((state) => state.users.user.id);
  const cartState = useSelector((state) => state.cart_items.items);

  useEffect(() => {
    user_id &&
      SET_CART_SESSION_USER_KEY(CART_SESSION_KEY.concat(`_${user_id}`));
    getCartSessionStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CART_SESSION_USER_KEY, user_id]);
  const dispatch = useDispatch();

  const saveItems = (values) => {
    let items = cleanDuplicatesEntries(values);
    localStorage.setItem(CART_SESSION_USER_KEY, JSON.stringify(items));
    dispatch(setCartItems(items ?? []));
    setSavedToCard(true);
    setTimeout(() => setSavedToCard(false), toasTime);
  };

  const removeAllCart = () => {
    localStorage.removeItem(CART_SESSION_USER_KEY);
    dispatch(setCartItems([]));
  };

  const getCartSessionStorage = () => {
    CART_SESSION_USER_KEY &&
      dispatch(
        setCartItems(
          JSON.parse(localStorage.getItem(CART_SESSION_USER_KEY)) || [],
        ),
      );
  };

  const addCartItem = async (value) => {
    let card_item = value.map((item) => {
      item['task_in_progress'] = false;
      return item;
    });
    await getCartSessionStorage();
    if (cartState) {
      saveItems(cartState.concat(card_item));
    } else {
      saveItems(card_item);
    }
  };

  const removeCartItem = async (id) => {
    await getCartSessionStorage();
    let newcart = cartState.slice();
    await newcart.forEach((item) => {
      if (item.unique_id === id) {
        newcart.splice(newcart.indexOf(item), 1);
      }
    });

    saveItems(newcart);
  };

  const cleanDuplicatesEntries = (arr) =>
    arr.filter(
      (arr, index, self) =>
        index === self.findIndex((t) => t.unique_id === arr.unique_id),
    );

  const Toast = ({ message, time = toasTime }) => {
    return (
      <>
        {setToastTime(time)}
        {savedToCard ? (
          <Message floating size="small">
            {message ? message : 'Added to card'}
          </Message>
        ) : (
          <></>
        )}
      </>
    );
  };

  const changeCartItemTaskStatus = async (unique_id, in_progress) => {
    await getCartSessionStorage();
    let newcart = cartState.map((item) => {
      if (item['unique_id'] === unique_id) {
        item['task_in_progress'] = in_progress;
      }
      return item;
    });
    saveItems(newcart);
  };
  // return [cart, addCartItem, removeCartSessionStorage];

  return {
    cart: cartState,
    addCartItem: addCartItem,
    removeAllCart: removeAllCart,
    removeCartItem: removeCartItem,
    Toast: Toast,
    isLoggedIn: isLoggedIn,
    changeCartItemTaskStatus: changeCartItemTaskStatus,
  };
};

export default useCartState;
