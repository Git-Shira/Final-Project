import Cookies from "js-cookie";

const cartPersistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith("cart/")) {
    const newState = store.getState().cart;
    Cookies.set("cart", JSON.stringify(newState.items), { expires: 7 });
  }
  return result;
};

export default cartPersistenceMiddleware;