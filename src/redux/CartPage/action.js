
import {
  applyCoupon,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT,
  DECREMENT,
  RESET,
  SET_CART_ITEMS
} from "./actionType";

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product
  };
};

export const removeFromCart = (item) => {
  return {
    type: REMOVE_FROM_CART,
    payload: item
  };
};

export const increment = (id) => {
  return {
    type: INCREMENT,
    payload: id
  };
};

export const decrement = (id) => {
  return {
    type: DECREMENT,
    payload: id
  };
};

export const cartReset = () => {
  return {
    type: RESET
  };
};

// New action for setting cart items after fetching from API
export const setCartItems = (items) => {
  return {
    type: SET_CART_ITEMS,
    payload: items
  };
};

export const coupon = (couponCode) => (dispatch) => {
  if (couponCode === "MASAI40") {
    dispatch({ type: applyCoupon, payload: 40 });
  } else if (couponCode === "MASAI30") {
    dispatch({ type: applyCoupon, payload: 30 });
  } else if (couponCode === "MASAI90") {
    dispatch({ type: applyCoupon, payload: 90 });
  } else if (couponCode === "MASAI20") {
    dispatch({ type: applyCoupon, payload: 20 });
  } else if (couponCode === "MASAI70") {
    dispatch({ type: applyCoupon, payload: 70 });
  } else {
    dispatch({ type: applyCoupon, payload: 0 });
  }
};