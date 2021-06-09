import React, {createContext} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserStore from "./store/UserStore";
import FavoriteStore from "./store/FavoriteStore";

export const Context = createContext(null)


ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        favorite: new FavoriteStore()
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);
