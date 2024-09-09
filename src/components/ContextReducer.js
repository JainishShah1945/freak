import React, { useContext, createContext, useReducer } from "react";
const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {

          
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
        },
      ];
    case "REMOVE":
      let newArray = [...state];
      newArray.splice(action.index, 1);
      return newArray;

    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;
    case "DROP":
      let newArr = [];
      return newArr;

    default:
      console.log("Invalid action type");
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);
