import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../test/testUtils";
import Input from "./input";

const defaultProps = {
  secretWord: "party"
}

const setup = (props) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Input { ...setupProps }/>);
}

test("renders without error", () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, "component-input");
  expect(inputComponent.length).toBe(1);
});

test("prop-types does not give warning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
    let mockSetCurrentGuess = jest.fn();
    let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess] );
    wrapper = setup();
  });
  test("currentGuess piece of state is updated onChange of input box", () => {
    const input = findByTestAttr(wrapper, "input-box");
    const inputEvent = { target: { value: "party" } };
    input.simulate("change", inputEvent)
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("party");
  });

  test("currentGuess is cleared upon click of the submit button", () => {
    const submitButton = wrapper.find("[data-test='submit-button']");
    const submitEvent = { preventDefault: () => {} };
    submitButton.simulate("click", submitEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
