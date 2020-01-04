import React from 'react';
// until enzyme github issue is fixed we need to use mount instead of shallow
// useEffect currently not called with shallow render
import { shallow, mount } from 'enzyme';
import { findByTestAttr } from "../../test/testUtils";
import App from './App';
import hookActions from "../actions/hookActions";

const mockGetSecretWord = jest.fn();

const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;  
  return mount(<App />);
};

test('renders without error', () => {
  const wrapper = setup();
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

