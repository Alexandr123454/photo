import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

const initialState = {
  images: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        images: action.value,
      };

    default:
      return state;
  }
}

const store = createStore(reducer, initialState)

const NewApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default NewApp;