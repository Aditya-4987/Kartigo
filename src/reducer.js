export const initialState = {
  cart: [],
  user: null,
  search: {
    query: "",
    isActive: false,
  },
};

// Selector for calculating cart total
export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price * item.quantity + amount, 0);

// Get shipping cost based on cart total
export const getShippingCost = (cartTotal) => {
  return cartTotal >= 1500 ? 0 : 100;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        search: {
          ...state.search,
          query: action.query,
          isActive: action.query !== "",
        },
      };
      
    case "CLEAR_SEARCH":
      return {
        ...state,
        search: {
          query: "",
          isActive: false,
        },
      };

    case "ADD_TO_CART":
      // Check if item already exists in cart
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.item.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity:
            updatedCart[existingItemIndex].quantity + action.item.quantity,
        };
        return { ...state, cart: updatedCart };
      } else {
        // Item doesn't exist, add it
        return {
          ...state,
          cart: [...state.cart, action.item],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };

    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default reducer;
