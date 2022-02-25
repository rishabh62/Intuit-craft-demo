import { createContext, useReducer } from "react";
import initialState from "./initialState";
import reducer from "./reducer";

const context = createContext(initialState);

function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
}

export { context, StateProvider };
