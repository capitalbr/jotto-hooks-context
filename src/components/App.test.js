import React from 'react';
// until enzyme github issue is fixed we need to use mount instead of shallow
// useEffect currently not called with shallow render
import { shallow, mount } from 'enzyme';
import { findByTestAttr } from "../../test/testUtils";
import App from './App';
import hookActions from "../actions/hookActions";

const mockGetSecretWord = jest.fn();

const setup = (secretWord) => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;  

  // all this is doing is making the 'state' variable have the desired store shape,
  // meaning it has a key of 'secretWord' with the value of our choice
  const mockUseReducer = jest.fn(() => {
    return (
      [
        { secretWord },
        jest.fn()
      ]
    )
  });

  React.useReducer = mockUseReducer
  return mount(<App />);

};

test('renders without error', () => {
  // needs secretWord in state to render app component so pass a string to setup
  const wrapper = setup("party");
  const appComponent = findByTestAttr(wrapper, "component-app")
  expect(appComponent.length).toBe(1);
});


describe("getSecretWord", () => {
  test("called on App mount", () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test("not called on App updates", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    
    // wrapper.update() does not trigger useEffect
    // will use alternative approach 'setProps()' until github issue is resolved
    wrapper.setProps();
    
    
    // alternative to using mockClear()
    // expect(mockGetSecretWord.mock.calls.length).toBe(1);

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});




describe("when secet word is a non empty string", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup("party");
  })
  
  test("renders app component", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(true);
  });
  
  test("does not render spinner", () => {
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.exists()).toBe(false);
  })

});

describe("when secret word is undefined, an empty string, or null", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(null);
  })

  test("does not render app component", () => {
    const appComponent = wrapper.find("[data-test='component-app']");
    expect(appComponent.exists()).toBe(false);
  });

  test("does render spinner", () => {
    const spinner = wrapper.find("[data-test='spinner']");
    expect(spinner.exists()).toBe(true);
  });

});





