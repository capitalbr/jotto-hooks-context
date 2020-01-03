import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../test/testUtils";
import Congrats from "../../components/jotto/congrats";

const defaultProps = { success: false };

const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps}/>);
}

test("renders without error", () => {
  const wrapper = setup();
  const congrats = findByTestAttr(wrapper, "component-congrats");
  expect(congrats.length).toBe(1);
});

test("renders no text when success prop is false", () => {
  const wrapper = setup({ success: false });
  const congrats = findByTestAttr(wrapper, "component-congrats");
  expect(congrats.text()).toBe("");
});

test("renders non empty congrats message when success prop is true", () => {
  const wrapper = setup({ success: true });
  const congrats = findByTestAttr(wrapper, "congrats-message");
  expect(congrats.text().length).not.toBe(0);
});

test("does not throw error with expected props", () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
});