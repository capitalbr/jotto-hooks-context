import React from "react";
import PropTypes from "prop-types";

const Input = ({ secretWord }) => {
  const [ currentGuess, setCurrentGuess ] = React.useState("");

  const handleClick = (e) => {
    e.preventDefault()
  };

  const handleChange = (e) => {
    setCurrentGuess(e.currentTarget.value);
  };

  return(
    <div data-test="component-input">
      <form className="form-inline">
        <input data-test="input-box"
          placeholder="make a guess"
          className="mb-2 mx-sm-3"
          onChange={handleChange}
          value={currentGuess}
        />
        <button data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  )
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
}

export default Input;