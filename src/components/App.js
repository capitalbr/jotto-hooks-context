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
  secretWord: ""
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setSecretWord = (secretWord) => {
    dispatch({ type: "setSecretWord", payload: secretWord});
  };

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  return (
    <div data-test="component-app">
      <Input />
    </div>
  );
}

export default App;
