import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import Input from "./input";

const defaultProps = {
  secretWord: "party"
}

const setup = (props) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Input />);
}

test("renders without error", () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, "component-input");
  expect(inputComponent.length).toBe(1);
});
