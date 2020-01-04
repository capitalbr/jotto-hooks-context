import React from 'react';
import Input from "./input/input";
import hookActions from "../actions/hookActions";


const reducer = (state, action) => {
  switch(action.type){
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const initialState = {
  // empty string shows no error on PropTypes but null would have which would have
  // alerted me to the fact that I probably need a spinner here in case of network
  // latency
  secretWord: null
}

function App() {
  // like a single reducer version of a redux store
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // basically like then returned promose part of a redux action after the
  // asynchronous api call has returned it's response
  const setSecretWord = (secretWord) => {
    dispatch({ type: "setSecretWord", payload: secretWord});
  };

  React.useEffect(() => {
    //  This is like the first part of a redux action, passing in the second part
    // in this case the second part takes in the argument that changes the state
    hookActions.getSecretWord(setSecretWord);
  }, []);

  return (
    state.secretWord 
    ? (
      <div className="container" data-test="component-app">
        <Input secretWord={state.secretWord} />
      </div>
    ) 
    : ( 
      <div 
        className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    )
  )
}

export default App;
