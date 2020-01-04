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
  test("currentGuess piece of state is updated onChange of input box", () => {
    const mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess] );
    const wrapper = setup();
    const input = findByTestAttr(wrapper, "input-box");
    const event = { 
      target: { value: "party" }, 
      currentTarget: { value: "party" } 
    }
    input.simulate("change", event );
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("party");
  });
});
