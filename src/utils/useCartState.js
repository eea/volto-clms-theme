import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCartItems } from '@eeacms/volto-clms-theme/actions';
import { Message } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
export const CART_SESSION_KEY = 'cart_session';

const useCartState = () => {
  const [cart, setCart] = useState([]);
  const [savedToCard, setSavedToCard] = useState(false);
  const [toasTime, setToastTime] = useState(3000);
  const CART_SESSION_USER_KEY = useSelector((state) =>
    state.users.user.id
      ? CART_SESSION_KEY.concat(`_${state.users.user.id}`)
      : CART_SESSION_KEY,
  );
  const isLoggedIn = useSelector((state) =>
    state.userSession.token ? jwtDecode(state.userSession.token).sub : '',
  )
    ? true
    : false;
  // const cartState = useSelector((state) => state.cart_items.items);
  // const state = store.getState();
  // const [loggedInStatus, setLoggedInStatus] = useState(
  //   useSelector((state) =>
  //     state.userSession.token ? jwtDecode(state.userSession.token).sub : '',
  //   ),
  // );

  const dispatch = useDispatch();

  const saveItems = (values) => {
    let items = cleanDuplicatesEntries(values);
    // localStorage.setItem(CART_SESSION_KEY, JSON.stringify(items));
    localStorage.setItem(CART_SESSION_USER_KEY, JSON.stringify(items));
    setCart(items);

    setSavedToCard(true);
    setTimeout(() => setSavedToCard(false), toasTime);
  };

  const removeAllCart = () => {
    localStorage.removeItem(CART_SESSION_USER_KEY);
    setCart([]);
  };

  const getCartSessionStorage = () => {
    setCart(JSON.parse(localStorage.getItem(CART_SESSION_USER_KEY)) || []);
  };

  const addCartItem = async (value) => {
    await getCartSessionStorage();
    if (cart) {
      saveItems(cart.concat(value));
    } else {
      saveItems(value);
    }
  };

  const removeCartItem = async (id) => {
    await getCartSessionStorage();
    let newcart = cart.slice();
    newcart.forEach((item) => {
      if (item.unique_id === id) {
        newcart.splice(newcart.indexOf(item), 1);
      }
    });
    setCart(newcart);
    saveItems(newcart);
  };

  const cleanDuplicatesEntries = (arr) =>
    arr.filter(
      (arr, index, self) =>
        index === self.findIndex((t) => t.unique_id === arr.unique_id),
    );

  useEffect(() => {
    getCartSessionStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CART_SESSION_USER_KEY]);

  useEffect(() => {
    dispatch(setCartItems(cart));
  }, [dispatch, cart]);

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

  // return [cart, addCartItem, removeCartSessionStorage];

  return {
    cart: cart,
    addCartItem: addCartItem,
    removeAllCart: removeAllCart,
    removeCartItem: removeCartItem,
    Toast: Toast,
    isLoggedIn: isLoggedIn,
  };
};

export default useCartState;
