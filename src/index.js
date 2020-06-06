import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import "./style/style.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

function Main() {
    return (
      <Provider store={store}>
          <App />
      </Provider>
    );
  }

ReactDOM.render(<Main />,document.getElementById('root'));
