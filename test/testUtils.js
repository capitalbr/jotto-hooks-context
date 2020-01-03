import checkPropTypes from "check-prop-types";

export const findByTestAttr = (wrapper, attribute) => (
  wrapper.find(`[data-test='${attribute}']`)
);

export const checkProps = (component, expectedProps) => {
  const propError = checkPropTypes(
    component.propTypes, 
    expectedProps, 
    "prop", 
    component.name
  );
  expect(propError).toBeUndefined();
};